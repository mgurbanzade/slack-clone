import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  const props = {
    messages: Object.values(state.messages.byId),
  };

  return props;
};

const actionCreators = {};

class Messages extends React.Component {

  renderEmptyChannel() {
    return (
      <div className="jumbotron d-flex justify-content-center">
        <h2 className="heading align-self-center text-muted">No messages to show</h2>
      </div>
    )
  }

  render() {
    const { messages } = this.props;

    if (messages.length === 0) return (this.renderEmptyChannel());
    const messageItems = messages.map((message) => {
      return (
        <div key={message.id}>
          <div className="font-weight-bold">User Name</div>
          <p>{message.text}</p>
        </div>
      );
    });

    return (
      <div>{messageItems}</div>
    )
  }
}

export default connect(mapStateToProps, actionCreators)(Messages)
