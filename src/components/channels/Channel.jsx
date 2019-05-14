import React from 'react';
import cn from 'classnames';
import connect from '../../connect';

const mapStateToProps = state => ({
  currentChannelId: state.currentChannelId,
  idsWithNewMessages: state.channelsUI.channelsIdsWithNewMessages,
});

@connect(mapStateToProps)

export default class Channel extends React.Component {
  switchChannel = id => () => {
    const { currentChannelId, markMessageAsRead, switchChannel } = this.props;
    markMessageAsRead(currentChannelId);
    switchChannel(id);
  }

  render() {
    const { channel, currentChannelId, idsWithNewMessages } = this.props;
    const { name, id } = channel;
    const activeClass = cn('channel font-weight-light', {
      active: id === currentChannelId,
      'text-light': id === currentChannelId || idsWithNewMessages.includes(id),
      'font-weight-bold': idsWithNewMessages.includes(id) && id !== currentChannelId,
    });

    return (
      <div onClick={this.switchChannel(id)} className={activeClass}>{name}</div>
    );
  }
}
