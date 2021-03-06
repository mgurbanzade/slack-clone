import io from 'socket.io-client';
import * as actions from '../actions';

export default (store) => {
  const socket = io.connect('/');

  socket.on('newMessage', (message) => {
    store.dispatch(actions.sendMessageSuccess({
      message,
    }));

    store.dispatch(actions.newMessageAlert({
      id: message.data.attributes.channelId,
    }));
  });

  socket.on('newChannel', (channel) => {
    store.dispatch(actions.createChannelSuccess({
      channel,
    }));
  });

  socket.on('removeChannel', (res) => {
    store.dispatch(actions.deleteChannelSuccess({
      id: res.data.id,
    }));
  });

  socket.on('renameChannel', (res) => {
    store.dispatch(actions.renameChannelSuccess({
      ...res.data.attributes,
    }));
  });
};
