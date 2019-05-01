import React from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { connect, dispatch } from 'react-redux';
import * as actions from '../actions';
import { HotKeys } from "react-hotkeys";
import _ from 'lodash';

const mapStateToProps = (state) => {
  return {
    currentChannelId: state.currentChannelId,
  };
};

const actionCreators = {
  sendMessage: actions.sendMessage,
};

class MessageForm extends React.Component {
  handleSubmit = async ({ message }) => {
    const { sendMessage, reset, currentChannelId } = this.props;
    await sendMessage({
      channelId: currentChannelId,
      text: message,
    });
    reset();
  }

  render() {
    const keyMap = {
      TRIGGER_SUBMIT: "enter",
    };

    const handlers = {
      'TRIGGER_SUBMIT': this.props.handleSubmit(this.handleSubmit)
    }

    return (
      <form className="form-group">
        <HotKeys handlers={handlers} keyMap={keyMap}>
          <Field name="message" className="form-control" required component="textarea" />
        </HotKeys>
      </form>
    )
  }
}

const ConnectedMessageForm = connect(mapStateToProps, actionCreators)(MessageForm);
export default reduxForm({
  form: 'messageForm',
})(ConnectedMessageForm);
