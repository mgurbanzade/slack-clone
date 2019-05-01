import React from 'react';

const Item = ({ children }) => <li className="list-group-item">{children}</li>;

export default class Channels extends React.Component {
  static Item = Item;

  render() {
    const { list } = this.props;
    if (list.length === 0) return null;

    const channelsList = list.map((channel) => {
      return (<Channels.Item key={channel.id}>{channel.name}</Channels.Item>);
    });

    return (<ul className="list-group col-3 pl-3">{channelsList}</ul>)
  }
}
