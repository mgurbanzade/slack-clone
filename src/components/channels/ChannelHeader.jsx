import React from 'react';
import connect from '../../connect';
import { FaPen, FaTrashAlt } from 'react-icons/fa';
import { Row, Button } from 'react-bootstrap';

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
      <div className="d-flex justify-content-between align-items-center border-bottom channel_header">
        <h1 className="font-weight-bold mb-0 text-dark channel_title">{`#${name}`}</h1>
        <Row>
          <Button className="text-dark border-0 bg-transparent channel_action-btn" onClick={this.showRenameModal}><FaPen /></Button>
          {removable ? <Button className="text-dark border-0 bg-transparent channel_action-btn" onClick={this.showDeleteModal}><FaTrashAlt /></Button> : null}
        </Row>
      </div>
    )
  }
}
