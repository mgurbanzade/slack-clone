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
  renameChannel = async ({ name }) => {
    if (!name || name.trim().length === 0) return null;
    const { channel, renameChannel, hideRenameChannelModal, reset } = this.props;
    await renameChannel({ ...channel, name });
    reset();
    hideRenameChannelModal();
  }

  render() {
    const { show, hideRenameChannelModal, submitting } = this.props;
    const keyMap = {
      TRIGGER_SUBMIT: "enter",
    };

    const handlers = {
      'TRIGGER_SUBMIT': this.props.handleSubmit(this.renameChannel)
    };

    const spinner = (
      <div className="spinner-border spinner-border-sm text-light" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    )

    return (
      <Modal show={show} onHide={hideRenameChannelModal}>
        <Modal.Header closeButton>
          <Modal.Title>Rename channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <HotKeys handlers={handlers} keyMap={keyMap}>
              <Field className="form-control" disabled={submitting} placeholder="Enter name" name="name" type="text" component="input" required autoFocus/>
            </HotKeys>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" disabled={submitting} onClick={this.renameChannel}>
            {submitting ? spinner : 'Rename'}
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
