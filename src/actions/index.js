import { createAction } from 'redux-actions';
import axios from 'axios';
import routes from '../utils/routes';

// modals
export const showChannelActionsModal = createAction('MODALS_SHOW');
export const hideChannelActionsModal = createAction('MODALS_HIDE');

// channels
export const switchChannel = createAction('CHANNELS_SWITCH');
export const receiveNewChannel = createAction('CHANNELS_RECEIVE');
export const deleteChannelRequest = createAction('CHANNELS_DELETE_REQUEST');
export const deleteChannelSuccess = createAction('CHANNELS_DELETE_SUCCESS');
export const deleteChannelFailure = createAction('CHANNELS_DELETE_FAILURE');
export const renameChannelSuccess = createAction('CHANNELS_RENAME_SUCCESS');
export const renameChannelFailure = createAction('CHANNELS_RENAME_FAILURE');

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
  dispatch(deleteChannelRequest());
  try {
    await axios.delete(url);
    dispatch(deleteChannelSuccess({ id }));
  } catch (error) {
    dispatch(deleteChannelFailure());
    throw error;
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
    dispatch(renameChannelSuccess(channel));
  } catch (error) {
    dispatch(renameChannelFailure());
    throw error;
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
    throw error;
  }
};
