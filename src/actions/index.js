import { createAction } from 'redux-actions';
import axios from 'axios';
import routes from '../utils/routes';

// modals
export const showChannelActionsModal = createAction('MODALS_SHOW');
export const hideChannelActionsModal = createAction('MODALS_HIDE');

// channels
export const switchChannel = createAction('CHANNELS_SWITCH');
export const receiveNewChannel = createAction('CHANNELS_RECEIVE');
export const deleteChannelFromStore = createAction('CHANNELS_DELETE');
export const renameChannelAtStore = createAction('CHANNELS_RENAME');
export const createChannel = ({ name }) => async (dispatch) => {
  const url = routes.postChannelURL;
  const attributes = { name };
  try {
    const response = await axios.post(url, {
      data: {
        attributes,
      },
    });

    dispatch(receiveNewChannel({ channel: response.data }));
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteChannel = ({ id }) => async (dispatch) => {
  const url = routes.deleteChannelURL(id);
  try {
    await axios.delete(url);
    dispatch(deleteChannelFromStore({ id }));
  } catch (error) {
    throw new Error(error);
  }
};

export const renameChannel = channel => async (dispatch) => {
  const url = routes.renameChannelURL(channel.id);

  try {
    await axios.patch(url, {
      data: {
        attributes: channel,
      },
    });

    dispatch(renameChannelAtStore(channel));
  } catch (error) {
    throw new Error(error);
  }
};

// channels UI
export const newMessageAlert = createAction('CHANNELS_UI_NEW_MESSAGE_ALERT');
export const markMessageAsRead = createAction('CHANNELS_UI_MARK_MESSAGE_AS_READ');

// messages
export const receiveNewMessage = createAction('MESSAGES_RECEIVE');
export const sendMessage = message => async (dispatch) => {
  const url = routes.postMessageURL(message.channelId);
  const attributes = { text: message.text, author: message.author, sentAt: message.sentAt };
  try {
    const response = await axios.post(url, {
      data: {
        attributes,
      },
    });

    dispatch(receiveNewMessage({ message: response.data }));
  } catch (error) {
    throw new Error(error);
  }
};
