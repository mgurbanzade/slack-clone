import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/application.css';
import io from 'socket.io-client';
import cookies from 'js-cookie';
import faker from 'faker';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import Channels from './channels/Channels';
import ChannelHeader from './channels/ChannelHeader';
import Messages from './Messages';
import MessageForm from './MessageForm';
import * as actions from '../actions';

if (!cookies.get('currentUser')) {
  cookies.set('currentUser', faker.name.findName(), { expires: 1 });
}

const initializeState = (state) => {
  const { channels, messages, currentChannelId } = state;
  return {
    channels: {
      byId: channels.reduce((acc, channel) => ({ ...acc, [channel.id]: channel }), {}),
      allIds: channels.map(channel => channel.id),
    },
    messages: {
      byId: messages.reduce((acc, message) => ({ ...acc, [message.id]: message }), {}),
      allIds: messages.map(message => message.id),
    },
    currentChannelId,
  };
};

const middleware = [
  applyMiddleware(thunk),
  ...(window.__REDUX_DEVTOOLS_EXTENSION__ ? [window.__REDUX_DEVTOOLS_EXTENSION__()] : [])
];

const store = createStore(
  reducers,
  initializeState(gon),
  compose(...middleware),
);

const socket = io.connect('/');

socket.on('newMessage', (message) => {
  store.dispatch(actions.receiveNewMessage({
    message,
  }))
})

socket.on('newChannel', (channel) => {
  store.dispatch(actions.receiveNewChannel({
    channel,
  }))
})

socket.on('removeChannel', (res) => {
  store.dispatch(actions.deleteChannelFromStore({
    id: res.data.id
  }))
})

const CurrentUserContext = React.createContext(cookies.get('currentUser'));
export default (gon) => {
  class App extends React.Component {
    static contextType = CurrentUserContext;

    render() {
      return (
        <div className="row vh-100">
          <Provider store={store}>
            <Channels />
            <div className="col-9 d-flex flex-column">
              <ChannelHeader />
              <Messages />
              <MessageForm currentUser={this.context} />
            </div>
          </Provider>
        </div>
      );
    }
  }

  return ReactDOM.render(<App channels={gon.channels} />, document.getElementById('chat'));
}
