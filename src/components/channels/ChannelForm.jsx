import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { HotKeys } from 'react-hotkeys';
import { IoIosAlert } from 'react-icons/io';
import connect from '../../decorators/connect';

const mapStateToProps = state => ({
  channelCreatingState: state.channelCreatingState,
});

@connect(mapStateToProps)
@reduxForm({ form: 'channelForm' })

export default class ChannelForm extends React.Component {
  handleSubmit = async ({ name }) => { // eslint-disable-line consistent-return
    if (!name || name.trim().length === 0) return null;
    const { createChannel, reset, hideForm } = this.props;
    await createChannel({ name });
    reset();
    hideForm();
  }

  render() {
    const {
      isVisible, handleSubmit, submitting, channelCreatingState,
    } = this.props;
    if (!isVisible) return null;

    const keyMap = {
      TRIGGER_SUBMIT: 'enter',
    };

    const handlers = {
      TRIGGER_SUBMIT: handleSubmit(this.handleSubmit),
    };

    const spinner = (
      <div className="spinner-border spinner-border-sm text-light" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );

    const failure = (
      <div className="text-danger pl-3">
        <IoIosAlert />
        <span className="text-danger pl-1">Request failed. Try again later!</span>
      </div>
    );

    const form = (
      <form>
        <HotKeys handlers={handlers} keyMap={keyMap}>
          <Field className="d-block bg-transparent border-0 ml-auto channel_input" name="name" type="text" component="input" required autoFocus />
        </HotKeys>
      </form>
    );

    return (
      submitting ? spinner : channelCreatingState === 'failed' ? failure : form
    );
  }
}
