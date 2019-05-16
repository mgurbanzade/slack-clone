import _ from 'lodash';

const initializeState = (state) => {
  const { channels, messages, currentChannelId } = state;
  return {
    channels: {
      byId: _.keyBy(channels, 'id'),
      allIds: channels.map(channel => channel.id),
    },
    channelDeletingState: 'none',
    channelRenamingState: 'none',
    channelsUI: {
      channelsIdsWithNewMessages: [],
    },
    messages: {
      byId: _.keyBy(messages, 'id'),
      allIds: messages.map(message => message.id),
    },
    currentChannelId,
    modals: {
      channelActions: {
        isVisible: false,
        closeModalHandler: null,
        actionData: null,
      },
    },
  };
};

export default initializeState;
