import React from 'react';
import connect from '../../connect';
import { FaPen, FaTrashAlt } from 'react-icons/fa';

const mapStateToProps = (state) => ({
  channel: state.channels.byId[state.currentChannelId],
})

@connect(mapStateToProps)

export default class ChannelHeader extends React.Component {
  showDeleteModal = () => this.props.showDeleteChannelModal();
  showRenameModal = () => this.props.showRenameChannelModal();

  render() {
    const { channel } = this.props;
    const { name, removable } = channel;

    return (
      <div className="channel_header">
        <h1>{`#${name}`}</h1>
        <div className="row">
          <button className="custom-button" onClick={this.showRenameModal}><FaPen /></button>
          {removable ? <button className="custom-button" onClick={this.showDeleteModal}><FaTrashAlt /></button> : null}
        </div>
      </div>
    )
  }
}
