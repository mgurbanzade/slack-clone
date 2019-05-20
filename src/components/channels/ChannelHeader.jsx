import React from 'react';
import { FaPen, FaTrashAlt } from 'react-icons/fa';
import { Row, Button } from 'react-bootstrap';
import connect from '../../decorators/connect';

const mapStateToProps = state => ({
  channel: state.channels.byId[state.currentChannelId],
});

@connect(mapStateToProps)

export default class ChannelHeader extends React.Component {
  showDeleteModal = () => {
    const {
      channel, showChannelActionsModal, hideChannelActionsModal, deleteChannel,
    } = this.props;

    showChannelActionsModal({
      isVisible: true,
      closeModalHandler: hideChannelActionsModal,
      actionData: {
        type: 'delete',
        title: `Delete channel: #${channel.name}`,
        btnTheme: 'danger',
        actionHandler: async () => {
          await deleteChannel({ id: channel.id });
          hideChannelActionsModal();
        },
      },
    });
  }

  showRenameModal = () => {
    const {
      channel, showChannelActionsModal, hideChannelActionsModal, renameChannel,
    } = this.props;

    showChannelActionsModal({
      isVisible: true,
      closeModalHandler: hideChannelActionsModal,
      actionData: {
        type: 'rename',
        title: `Rename channel: #${channel.name}`,
        btnTheme: 'primary',
        actionHandler: async ({ name }) => {
          if (!name || name.trim().length === 0) return;
          await renameChannel({ ...channel, name });
          hideChannelActionsModal();
        },
      },
    });
  }

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
    );
  }
}
