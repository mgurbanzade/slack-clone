import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const props = {
    messages: Object.values(state.messages.byId),
  };

  return props;
};

class Messages extends React.Component {

  renderEmptyChannel() {
    return (
      <div className="jumbotron d-flex justify-content-center" style={{flexGrow: 1}}>
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
          <div className="font-weight-bold">{message.author}</div>
          <p>{message.text}</p>
        </div>
      );
    });

    return (
      <div style={{ flexGrow: 1, maxHeight: '88vh', overflowY: 'scroll' }}>{messageItems}</div>
    )
  }
}

export default connect(mapStateToProps)(Messages)
