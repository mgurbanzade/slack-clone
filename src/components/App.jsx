import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/application.scss';
import '../../favicon.ico';
import io from 'socket.io-client';
import gon from 'gon';
import cookies from 'js-cookie';
import faker from 'faker';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Row, Col } from 'react-bootstrap';
import reducers from '../reducers';
import Channels from './channels/Channels';
import ChannelHeader from './channels/ChannelHeader';
import Messages from './messages/Messages';
import MessageForm from './messages/MessageForm';
import DeleteChannelModal from './modals/DeleteChannelModal';
import RenameChannelModal from './modals/RenameChannelModal';
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
    channelsUI: {
      channelsIdsWithNewMessages: [],
    },
    messages: {
      byId: messages.reduce((acc, message) => ({ ...acc, [message.id]: message }), {}),
      allIds: messages.map(message => message.id),
    },
    currentChannelId,
    modals: {
      deleteChannelModalIsVisible: false,
      renameChannelModalIsVisible: false,
    },
  };
};

const middleware = [
  applyMiddleware(thunk),
  ...(window.__REDUX_DEVTOOLS_EXTENSION__ ? [window.__REDUX_DEVTOOLS_EXTENSION__()] : []),
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
  }));

  store.dispatch(actions.newMessageAlert({
    id: message.data.attributes.channelId,
  }));
});

socket.on('newChannel', (channel) => {
  store.dispatch(actions.receiveNewChannel({
    channel,
  }));
});

socket.on('removeChannel', (res) => {
  store.dispatch(actions.deleteChannelFromStore({
    id: res.data.id,
  }));
});

socket.on('renameChannel', (res) => {
  store.dispatch(actions.renameChannelAtStore({
    ...res.data.attributes,
  }));
});

const CurrentUserContext = React.createContext(cookies.get('currentUser'));
export default (gonObject) => {
  class App extends React.Component {
    static contextType = CurrentUserContext;

    render() {
      return (
        <Row className="vh-100">
          <Provider store={store}>
            <Channels />
            <Col xs={9} className="d-flex flex-column">
              <ChannelHeader />
              <Messages />
              <MessageForm currentUser={this.context} />
              <DeleteChannelModal />
              <RenameChannelModal />
            </Col>
          </Provider>
        </Row>
      );
    }
  }

  ReactDOM.render(<App channels={gonObject.channels} />, document.getElementById('chat'));
};
