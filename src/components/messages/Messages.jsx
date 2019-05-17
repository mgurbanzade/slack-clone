import React from 'react';
import connect from '../../decorators/connect';

const mapStateToProps = (state) => {
  const messagesList = Object.values(state.messages.byId);
  return {
    messages: messagesList.filter(m => m.channelId === state.currentChannelId),
  };
};

@connect(mapStateToProps)

export default class Messages extends React.Component {
  focusArea = React.createRef()

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    if (!this.focusArea.current) return null;
    this.focusArea.current.scrollIntoView({ behavior: 'smooth' });
    return null;
  }

  renderEmptyChannel = () => (
    <div className="jumbotron d-flex justify-content-center flex-grow-1">
      <h2 className="heading align-self-center text-muted">No messages to show</h2>
    </div>
  );

  render() {
    const { messages } = this.props;

    if (messages.length === 0) return (this.renderEmptyChannel());
    const messageItems = messages.map(message => (
        <div key={message.id}>
          <div>
            <span className="font-weight-bold mr-2">{message.author}</span>
            <span className="text-muted">{message.sentAt}</span>
          </div>
          <p>{message.text}</p>
        </div>
    ));

    return (
      <div ref={this.wrapperRef} className="flex-grow-1 messages">
        {messageItems}
        <div ref={this.focusArea}></div>
      </div>
    );
  }
}
