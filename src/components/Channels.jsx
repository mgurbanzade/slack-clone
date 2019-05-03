import React from 'react';

const Item = ({ children }) => <li className="list-group-item text-light border-0" style={{ backgroundColor: '#3F0E40' }}>{children}</li>;

export default class Channels extends React.Component {
  static Item = Item;

  render() {
    const { list } = this.props;
    if (list.length === 0) return null;

    const channelsList = list.map((channel) => {
      return (<Channels.Item key={channel.id}>{channel.name}</Channels.Item>);
    });

    return (<ul className="list-group col-3 pl-3 min-100" style={{backgroundColor: '#3F0E40'}}>{channelsList}</ul>)
  }
}
