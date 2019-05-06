import React from 'react';
import connect from '../../connect';
import { Modal, Button } from 'react-bootstrap';
import { reduxForm, Field } from 'redux-form';
import { HotKeys } from 'react-hotkeys';

const mapStateToProps = (state) => ({
  show: state.modals.renameChannelModalIsVisible,
  channel: state.channels.byId[state.currentChannelId],
})

@connect(mapStateToProps)
@reduxForm({ form: 'renameChannelForm' })

export default class RenameChannelModal extends React.Component {
  renameChannel = async ({ channelName }) => {
    const { channel, renameChannel, hideRenameChannelModal, reset } = this.props;
    await renameChannel({ ...channel, name: channelName });
    reset();
    hideRenameChannelModal();
  }

  render() {
    const { show, hideRenameChannelModal } = this.props;
    const keyMap = {
      TRIGGER_SUBMIT: "enter",
    };

    const handlers = {
      'TRIGGER_SUBMIT': this.props.handleSubmit(this.renameChannel)
    };

    return (
      <Modal show={show} onHide={hideRenameChannelModal}>
        <Modal.Header closeButton>
          <Modal.Title>Rename channel</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form>
            <HotKeys handlers={handlers} keyMap={keyMap}>
              <Field className="form-control" placeholder="Enter name" name="channelName" type="text" component="input" required autoFocus/>
            </HotKeys>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={this.renameChannel}>Rename</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
