import _ from 'lodash';

const initializeState = (state) => {
  const { channels, messages, currentChannelId } = state;
  return {
    channels: {
      byId: _.keyBy(channels, 'id'),
      allIds: channels.map(channel => channel.id),
    },
    channelsUI: {
      channelsIdsWithNewMessages: [],
    },
    messages: {
      byId: _.keyBy(messages, 'id'),
      allIds: messages.map(message => message.id),
    },
    currentChannelId,
    modals: {
      deleteChannelModalIsVisible: false,
      renameChannelModalIsVisible: false,
    },
  };
};

export default initializeState;