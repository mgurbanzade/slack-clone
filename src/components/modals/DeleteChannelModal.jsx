import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import connect from '../../decorators/connect';

const mapStateToProps = state => ({
  show: state.modals.deleteChannelModalIsVisible,
  channel: state.channels.byId[state.currentChannelId],
});

@connect(mapStateToProps)

export default class DeleteChannelModal extends React.Component {
  deleteChannel = async () => {
    const { channel, deleteChannel, hideDeleteChannelModal } = this.props;
    await deleteChannel({ id: channel.id });
    hideDeleteChannelModal();
  }

  render() {
    const { channel, show, hideDeleteChannelModal } = this.props;
    const title = `Delete channel: #${channel.name}`;

    return (
      <Modal show={show} onHide={hideDeleteChannelModal}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Are you sure?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={this.deleteChannel}>Delete</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
