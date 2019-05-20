import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { HotKeys } from 'react-hotkeys';
import { format } from 'date-fns';
import { Alert } from 'react-bootstrap';
import connect from '../../decorators/connect';
import CurrentUserContext from '../../utils/context';

const mapStateToProps = state => ({
  messageSendingState: state.messageSendingState,
  currentChannelId: state.currentChannelId,
});

@connect(mapStateToProps)
@reduxForm({ form: 'messageForm' })

export default class MessageForm extends React.Component {
  static contextType = CurrentUserContext;

  handleSubmit = async ({ message }) => {
    if (!message || message.trim().length === 0) return;
    const {
      sendMessage, reset, currentChannelId,
    } = this.props;

    await sendMessage({
      channelId: currentChannelId,
      author: this.context,
      text: message,
      sentAt: format(new Date(), 'HH:mm'),
    });

    reset();
  }

  render() {
    const { messageSendingState, handleSubmit, submitting } = this.props;
    const keyMap = {
      TRIGGER_SUBMIT: 'enter',
    };

    const handlers = {
      TRIGGER_SUBMIT: handleSubmit(this.handleSubmit),
    };

    const loading = (
      <div id="spinnerContainer" className="spinner-container text-center">
        <div className="spinner-grow" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow" role="status">
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
    );

    const failure = (
      <Alert variant={'danger'}>
        Something went wrong. Please
        <a href="#" className="text-primary" onClick={() => window.location.reload()}> try again!</a>
      </Alert>
    );

    return (
      submitting ? loading : messageSendingState === 'failed' ? failure : form
    );
  }
}
