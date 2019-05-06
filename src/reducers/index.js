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
  [actions.renameChannelAtStore](state, { payload: channel }) {
    const { id, name } = channel;
    const { byId, allIds } = state;
    const updatedChannel = { ...byId[id], name };
    byId[id] = updatedChannel;

    return {
      byId,
      allIds,
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

const modals = handleActions({
  [actions.showDeleteChannelModal](state) {
    return {
      ...state,
      deleteChannelModalIsVisible: true,
    };
  },
  [actions.showRenameChannelModal](state) {
    return {
      ...state,
      renameChannelModalIsVisible: true,
    };
  },
  [actions.hideDeleteChannelModal](state) {
    return {
      ...state,
      deleteChannelModalIsVisible: false,
    };
  },
  [actions.hideRenameChannelModal](state) {
    return {
      ...state,
      renameChannelModalIsVisible: false,
    };
  },
}, false);

export default combineReducers({
  channels,
  messages,
  currentChannelId,
  modals,
  form: formReducer,
});
