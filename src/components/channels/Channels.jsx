import React from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { Col, Button } from 'react-bootstrap';
import connect from '../../connect';
import ChannelForm from './ChannelForm';
import Channel from './Channel';

const mapStateToProps = state => ({
  channels: Object.values(state.channels.byId),
});

@connect(mapStateToProps)

export default class Channels extends React.Component {
  state = {
    formIsVisible: false,
  }

  showChannelForm = () => this.setState({ formIsVisible: true })

  hideChannelForm = () => this.setState({ formIsVisible: false });

  handleClick = (e) => {
    if (e.target.nodeName !== 'INPUT' && this.state.formIsVisible) {
      this.hideChannelForm();
    }
  }

  renderItems() {
    const { channels } = this.props;

    return channels.map(channel => (
        <Channel key={channel.id} channel={channel} />
    ));
  }

  render() {
    const { channels } = this.props;
    if (channels.length === 0) return null;

    return (
      <Col xs={3} onClick={this.handleClick} className="pt-3 min-100 channels">
        <div className="channels_title align-items-center">
          <span>Channels</span>
          <Button onClick={this.showChannelForm} className="bg-transparent border-0 channels_add-btn">
            <IoIosAddCircleOutline />
          </Button>
        </div>
        {this.renderItems()}
        <ChannelForm hideForm={this.hideChannelForm} isVisible={this.state.formIsVisible} />
      </Col>
    );
  }
}
