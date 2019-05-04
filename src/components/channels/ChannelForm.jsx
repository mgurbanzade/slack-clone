import React from 'react';
import connect from '../../connect';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { HotKeys } from 'react-hotkeys';

const mapStateToProps = (state) => ({});

@connect(mapStateToProps)
@reduxForm({ form: 'channelForm' })

export default class ChannelForm extends React.Component {
  handleSubmit = async ({ channel }) => {
    if (!channel || channel.trim().length === 0) return null;
    const { createChannel, reset, hideForm } = this.props;

    try {
      await createChannel({
        name: channel
      });

      reset();
      hideForm();
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
  }

  render() {
    if (!this.props.isVisible) return null;
    const keyMap = {
      TRIGGER_SUBMIT: "enter",
    };

    const handlers = {
      'TRIGGER_SUBMIT': this.props.handleSubmit(this.handleSubmit)
    };

    const spinner = (
      <div className="spinner-border spinner-border-sm text-light" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    )

    const form = (
      <form>
        <HotKeys handlers={handlers} keyMap={keyMap}>
          <Field className="channel_input" name="channel" type="text" component="input" required autoFocus />
        </HotKeys>
      </form>
    )

    return (
      this.props.submitting ? spinner : form
    )
  }
}
