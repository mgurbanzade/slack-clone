import React from 'react';
import connect from '../connect';
import cn from 'classnames';
import { IoIosAddCircleOutline } from "react-icons/io";

const mapStateToProps = state => ({
  channels: Object.values(state.channels.byId),
  currentChannelId: state.currentChannelId,
})

@connect(mapStateToProps)

export default class Channels extends React.Component {
  static Item = ({onClick, className, children}) => {
    return (<div onClick={onClick} className={className}>{children}</div>)
  }

  switchChannel = (id) => () => this.props.switchChannel(id);

  renderItems() {
    const { channels, currentChannelId } = this.props;

    return channels.map((channel) => {
      const activeClass = cn('channel', {
        active: channel.id === currentChannelId
      });

      return (
        <Channels.Item
          onClick={this.switchChannel(channel.id)}
          className={activeClass}
          key={channel.id}>
          {channel.name}
        </Channels.Item>);
    });
  }

  render() {
    const { channels } = this.props;
    if (channels.length === 0) return null;

    return (
      <div className="col-3 pt-3 min-100" style={{backgroundColor: '#3F0E40'}}>
        <div className="heading">
          <span>Channels</span>
          <button className="channel_new">
            <IoIosAddCircleOutline />
          </button>
        </div>
        {this.renderItems()}
      </div>
    )
  }
}
