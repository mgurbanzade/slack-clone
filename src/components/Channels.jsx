import React from 'react';
import connect from '../connect';
import cn from 'classnames';
import { IoIosAddCircleOutline } from "react-icons/io";
import ChannelForm from './ChannelForm';

const mapStateToProps = state => ({
  channels: Object.values(state.channels.byId),
  currentChannelId: state.currentChannelId,
})

@connect(mapStateToProps)

export default class Channels extends React.Component {
  state = {
    formIsVisible: false
  }

  static Item = ({onClick, className, children}) => {
    return (<div onClick={onClick} className={className}>{children}</div>)
  }

  switchChannel = (id) => () => this.props.switchChannel(id);
  showChannelForm = () => this.setState({ formIsVisible: true })
  hideChannelForm = () => this.setState({ formIsVisible: false });
  handleClick = (e) => {
    if (e.target.nodeName !== 'INPUT' && this.state.formIsVisible) {
      this.hideChannelForm()
    }
  }

  renderItems() {
    const { channels, currentChannelId } = this.props;

    return channels.map((channel) => {
      const activeClass = cn('channel', {
        active: channel.id === currentChannelId
      });

      return (
        <Channels.Item
          onClick={this.switchChannel(channel.id)}
          className={activeClass}
          key={channel.id}>
          {channel.name}
        </Channels.Item>);
    });
  }

  render() {
    const { channels } = this.props;
    if (channels.length === 0) return null;

    return (
      <div onClick={this.handleClick} className="col-3 pt-3 min-100" style={{backgroundColor: '#3F0E40'}}>
        <div className="heading">
          <span>Channels</span>
          <button onClick={this.showChannelForm} className="channel_new">
            <IoIosAddCircleOutline />
          </button>
        </div>
        {this.renderItems()}
        <ChannelForm hideForm={this.hideChannelForm}  isVisible={this.state.formIsVisible} />
      </div>
    )
  }
}
