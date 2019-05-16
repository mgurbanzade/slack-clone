import React from 'react';
import _ from 'lodash';
import { Modal, Button } from 'react-bootstrap';
import RenameChannelModal from './channel-actions/RenameChannelModal';
import DeleteChannelModal from './channel-actions/DeleteChannelModal';
import connect from '../../decorators/connect';

const mapStateToProps = state => ({
  channelActions: state.modals.channelActions,
});

@connect(mapStateToProps)

export default class ChannelActionsModal extends React.Component {
  render() {
    const { isVisible, closeModalHandler, actionData } = this.props.channelActions;
    if (!actionData) return null;
    const {
      type, title, btnTheme, actionHandler,
    } = actionData;
    const actionTitle = _.capitalize(actionData.type);

    const modalBodyDispatcher = {
      delete: (<DeleteChannelModal />),
      rename: (<RenameChannelModal />),
    };

    const modalFooterDispatcher = {
      delete: (
        <Modal.Footer>
          <Button variant={btnTheme} onClick={actionHandler}>
            {actionTitle}
          </Button>
        </Modal.Footer>
      ),
      rename: null,
    };

    return (
      <Modal show={isVisible} onHide={closeModalHandler}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalBodyDispatcher[type]}
        </Modal.Body>
        {modalFooterDispatcher[type]}
      </Modal>
    );
  }
}
