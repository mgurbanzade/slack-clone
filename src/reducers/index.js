import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const currentChannelId = handleActions({
  [actions.switchChannel](state, { payload: id }) {
    return { ...state, currentChannelId: id };
  }
}, {})

const channels = handleActions({}, {});

const messages = handleActions({
  [actions.receiveNewMessage](state, { payload: { message } }) {
    const { id, attributes } = message.data;
    return {
      byId: { ...state.byId, [id]: attributes },
      allIds: [...state.allIds, id],
    };
  },
}, []);

export default combineReducers({
  channels,
  messages,
  currentChannelId,
  form: formReducer,
});
