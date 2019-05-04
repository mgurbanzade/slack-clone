import React from 'react';
import connect from '../../connect';
import { FaPen, FaTrashAlt } from 'react-icons/fa';

const mapStateToProps = (state) => ({
  channel: state.channels.byId[state.currentChannelId],
})

@connect(mapStateToProps)

export default class ChannelHeader extends React.Component {
  deleteChannel = async () => {
    const { channel, deleteChannel } = this.props;
    await deleteChannel({id: channel.id});
  }

  render() {
    const { name, removable } = this.props.channel;
    return (
      <div className="channel_header">
        <h1>{`#${name}`}</h1>
        <div className="row">
          <button className="custom-button"><FaPen /></button>
          {removable ? <button className="custom-button" onClick={this.deleteChannel}><FaTrashAlt /></button> : null}
        </div>
      </div>
    )
  }
}
