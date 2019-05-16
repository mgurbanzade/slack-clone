import io from 'socket.io-client';
import * as actions from '../actions';

export default (store) => {
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
};
