import { createAction } from 'redux-actions';
import axios from 'axios';
import routes from '../routes';
// export const switchChannel = createAction('CHANNELS_SWITCH');
// export const fetchMessages = () => {};

// export const fetchChannelsRequest = createAction('CHANNELS_FETCH_REQUEST');
// export const fetchChannelsSuccess = createAction('CHANNELS_FETCH_SUCCESS');
// export const fetchChannelsFailure = createAction('CHANNELS_FETCH_FAILURE');

export const switchChannel = createAction('CHANNELS_SWITCH');
export const receiveNewMessage = createAction('MESSAGES_RECEIVE');

export const sendMessage = message => async (dispatch) => {
  const url = routes.postMessageURL(message.channelId);
  const attributes = { text: message.text };
  const response = await axios.post(url, {
    data: {
      attributes,
    },
  });

  dispatch(receiveNewMessage({ message: response.data }));
};
