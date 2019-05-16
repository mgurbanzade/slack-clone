import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { HotKeys } from 'react-hotkeys';
import connect from '../../../decorators/connect';

const mapStateToProps = state => ({
  renameHandler: state.modals.channelActions.actionData.actionHandler,
});

@connect(mapStateToProps)
@reduxForm({ form: 'renameChannelForm' })

export default class RenameChannelModal extends React.Component {
  render() {
    const { submitting, renameHandler } = this.props;
    const keyMap = {
      TRIGGER_SUBMIT: 'enter',
    };

    const handlers = {
      TRIGGER_SUBMIT: this.props.handleSubmit(renameHandler),
    };

    return (
      <form>
        <HotKeys handlers={handlers} keyMap={keyMap}>
          <Field className="form-control" disabled={submitting} placeholder="Enter name" name="name" type="text" component="input" required autoFocus/>
        </HotKeys>
      </form>
    );
  }
}
