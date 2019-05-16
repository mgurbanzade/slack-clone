import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import _ from 'lodash';
import * as actions from '../actions';

const currentChannelId = handleActions({
  [actions.switchChannel](state, { payload: id }) {
    return id;
  },
  [actions.deleteChannelSuccess]() {
    return 1;
  },
}, 1);

const channels = handleActions({
  [actions.createChannelSuccess](state, { payload: { channel } }) {
    const { id, attributes } = channel.data;
    return {
      byId: { ...state.byId, [id]: attributes },
      allIds: [...state.allIds, id],
    };
  },
  [actions.deleteChannelSuccess](state, { payload: { id } }) {
    const { byId, allIds } = state;
    return {
      byId: _.omit(byId, [id]),
      allIds: allIds.filter(cid => cid !== id),
    };
  },
  [actions.renameChannelSuccess](state, { payload: channel }) {
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

const channelCreatingState = handleActions({
  [actions.createChannelFailure]() {
    return 'failed';
  },
  [actions.createChannelSuccess]() {
    return 'finished';
  },
}, 'none');

const channelDeletingState = handleActions({
  [actions.deleteChannelFailure]() {
    return 'failed';
  },
  [actions.deleteChannelSuccess]() {
    return 'finished';
  },
}, 'none');

const channelRenamingState = handleActions({
  [actions.renameChannelFailure]() {
    return 'failed';
  },
  [actions.renameChannelSuccess]() {
    return 'finished';
  },
}, 'none');

const channelsUI = handleActions({
  [actions.newMessageAlert](state, { payload: { id } }) {
    const oldIds = state.channelsIdsWithNewMessages;
    const updatedIds = oldIds.includes(id) ? oldIds : [...oldIds, id];
    return {
      channelsIdsWithNewMessages: updatedIds,
    };
  },
  [actions.markMessageAsRead](state, { payload: id }) {
    const oldIds = state.channelsIdsWithNewMessages;
    const updatedIds = oldIds.filter(ID => ID !== id);

    return {
      channelsIdsWithNewMessages: updatedIds,
    };
  },
  [actions.switchChannel](state, { payload: id }) {
    const oldIds = state.channelsIdsWithNewMessages;
    const updatedIds = oldIds.filter(ID => ID !== id);
    return {
      channelsIdsWithNewMessages: updatedIds,
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
  [actions.deleteChannelSuccess](state, { payload: { id } }) {
    const { byId } = state;
    const updatedById = _.omitBy(byId, m => m.channelId === id);

    return {
      byId: updatedById,
      allIds: Object.values(updatedById).map(m => m.id),
    };
  },
}, []);

const modals = handleActions({
  [actions.showChannelActionsModal](state, { payload }) {
    return {
      ...state,
      channelActions: payload,
    };
  },
  [actions.hideChannelActionsModal](state) {
    const { channelActions } = state;

    return {
      ...state,
      channelActions: {
        ...channelActions,
        isVisible: false,
        closeModalHandler: null,
      },
    };
  },
}, {});

export default combineReducers({
  channels,
  channelCreatingState,
  channelDeletingState,
  channelRenamingState,
  channelsUI,
  messages,
  currentChannelId,
  modals,
  form: formReducer,
});
