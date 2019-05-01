import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/application.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import Channels from './Channels';
import Messages from './Messages';
import MessageForm from './MessageForm';

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

const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && ext();

const store = createStore(
  reducers,
  initializeState(gon),
  compose(
    applyMiddleware(thunk),
    devtoolMiddleware,
  ),
);


export default (gon) => {
  class App extends React.Component {
    render() {
      return (
        <div className="row">
          <Provider store={store}>
            <Channels list={this.props.channels} />
            <div className="col-9">
              <Messages />
              <MessageForm />
            </div>
          </Provider>
        </div>
      );
    }
  }

  return ReactDOM.render(<App channels={gon.channels} />, document.getElementById('chat'));
}
