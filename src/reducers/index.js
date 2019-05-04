import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import _ from 'lodash';
import * as actions from '../actions';

const currentChannelId = handleActions({
  [actions.switchChannel](state, { payload: id }) {
    return id;
  },
  [actions.deleteChannelFromStore]() {
    return 1;
  },
}, 1);

const channels = handleActions({
  [actions.receiveNewChannel](state, { payload: { channel } }) {
    const { id, attributes } = channel.data;
    return {
      byId: { ...state.byId, [id]: attributes },
      allIds: [...state.allIds, id],
    };
  },
  [actions.deleteChannelFromStore](state, { payload: { id } }) {
    const { byId, allIds } = state;
    return {
      byId: _.omit(byId, [id]),
      allIds: allIds.filter(cid => cid !== id),
    };
  },
}, []);

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
