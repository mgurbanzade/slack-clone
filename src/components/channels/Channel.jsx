import React from 'react';
import cn from 'classnames';
import connect from '../../connect';

const mapStateToProps = (state) => ({
  currentChannelId: state.currentChannelId,
})

@connect(mapStateToProps)

export default class Channel extends React.Component {
  state = {
    actionsAreVisible: false
  }

  switchChannel = (id) => () => this.props.switchChannel(id);

  render() {
    const { channel, currentChannelId } = this.props;
    const { name, id } = channel;

    const activeClass = cn('channel', {
      active: id === currentChannelId
    });

    return (
      <div onClick={this.switchChannel(id)} className={activeClass}>{name}</div>
    )
  }
}
