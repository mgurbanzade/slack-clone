const apiVersionPrefix = '/api/v1';

export default {
  postMessageURL: channelId => `${apiVersionPrefix}/channels/${channelId}/messages`,
  postChannelURL: `${apiVersionPrefix}/channels`,
};
