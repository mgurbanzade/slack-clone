import React from 'react';
import connect from '../../connect';
import { reduxForm, Field } from 'redux-form';
import { HotKeys } from 'react-hotkeys';

const mapStateToProps = () => ({});

@connect(mapStateToProps)
@reduxForm({ form: 'channelForm' })

export default class ChannelForm extends React.Component {
  handleSubmit = async ({ name }) => {
    if (!name || name.trim().length === 0) return null;
    const { createChannel, reset, hideForm } = this.props;
    await createChannel({ name });
    reset();
    hideForm();
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
          <Field className="d-block bg-transparent border-0 ml-auto channel_input" name="name" type="text" component="input" required autoFocus />
        </HotKeys>
      </form>
    )

    return (
      this.props.submitting ? spinner : form
    )
  }
}