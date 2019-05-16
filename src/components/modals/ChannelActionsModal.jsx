import React from 'react';
import _ from 'lodash';
import { Modal, Button } from 'react-bootstrap';
import RenameChannelModal from './channel-actions/RenameChannelModal';
import DeleteChannelModal from './channel-actions/DeleteChannelModal';
import connect from '../../decorators/connect';

const mapStateToProps = state => ({
  channelActions: state.modals.channelActions,
  channelDeletingState: state.channelDeletingState,
});

@connect(mapStateToProps)

export default class ChannelActionsModal extends React.Component {
  render() {
    const {
      channelDeletingState,
      channelActions: { isVisible, closeModalHandler, actionData },
    } = this.props;

    if (!actionData) return null;
    const {
      type, title, btnTheme, actionHandler,
    } = actionData;
    const actionTitle = _.capitalize(actionData.type);

    const modalBodyDispatcher = {
      delete: (<DeleteChannelModal requestState={channelDeletingState} />),
      rename: (<RenameChannelModal />),
    };

    const spinner = (
      <>
        <div className="spinner-border spinner-border-sm text-light" role="status"></div>
        <span className="sr-only">Loading...</span>
      </>
    );

    const modalFooterDispatcher = {
      delete: (
        channelDeletingState === 'failed' ? null
          : <Modal.Footer>
            <Button variant={btnTheme} onClick={actionHandler}>
              {channelDeletingState === 'requested' ? spinner : actionTitle}
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
