import React from 'react';
import connect from '../../connect';
import { IoIosAddCircleOutline } from "react-icons/io";
import ChannelForm from './ChannelForm';
import Channel from './Channel';

const mapStateToProps = state => ({
  channels: Object.values(state.channels.byId),
})

@connect(mapStateToProps)

export default class Channels extends React.Component {
  state = {
    formIsVisible: false
  }

  showChannelForm = () => this.setState({ formIsVisible: true })
  hideChannelForm = () => this.setState({ formIsVisible: false });
  handleClick = (e) => {
    if (e.target.nodeName !== 'INPUT' && this.state.formIsVisible) {
      this.hideChannelForm()
    }
  }

  renderItems() {
    const { channels } = this.props;

    return channels.map((channel) => {
      return (
        <Channel key={channel.id} channel={channel} />
      );
    });
  }

  render() {
    const { channels } = this.props;
    if (channels.length === 0) return null;

    return (
      <div onClick={this.handleClick} className="col-3 pt-3 min-100" style={{backgroundColor: '#3F0E40'}}>
        <div className="heading">
          <span>Channels</span>
          <button onClick={this.showChannelForm} className="custom-button">
            <IoIosAddCircleOutline />
          </button>
        </div>
        {this.renderItems()}
        <ChannelForm hideForm={this.hideChannelForm}  isVisible={this.state.formIsVisible} />
      </div>
    )
  }
}
