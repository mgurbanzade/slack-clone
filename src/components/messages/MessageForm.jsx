import React from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import connect from '../../connect';
import { HotKeys } from "react-hotkeys";
import _ from 'lodash';
import { format } from 'date-fns';

const mapStateToProps = (state) => ({
  currentChannelId: state.currentChannelId,
})

@connect(mapStateToProps)
@reduxForm({ form: 'messageForm' })

export default class MessageForm extends React.Component {
  handleSubmit = async ({ message }) => {
    if (!message || message.trim().length === 0) return null;
    const { sendMessage, reset, currentChannelId, currentUser } = this.props;

    try {
      await sendMessage({
        channelId: currentChannelId,
        author: currentUser,
        text: message,
        sentAt: format(new Date(), 'HH:mm')
      });

      reset();
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
  }

  render() {
    const keyMap = {
      TRIGGER_SUBMIT: "enter",
    };

    const handlers = {
      'TRIGGER_SUBMIT': this.props.handleSubmit(this.handleSubmit)
    }

    const loading = (
      <div id="spinnerContainer" className="spinner-container text-center">
        <div className="spinner-grow" role="status" style={{ color: '#3F0E40'}}>
          <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow" role="status" style={{ color: '#3F0E40' }}>
          <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow" role="status" style={{ color: '#3F0E40' }}>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

    const form = (
      <form className="form-group">
        <HotKeys handlers={handlers} keyMap={keyMap}>
          <Field name="message" className="form-control" required autoFocus component="textarea" />
        </HotKeys>
      </form>
    )

    return (
      this.props.submitting ? loading : form
    )
  }
}
