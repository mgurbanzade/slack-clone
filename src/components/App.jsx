import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/application.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Channels from './Channels';

export default (gon) => {
  class App extends React.Component {
    render() {
      return (
        <div className="row">
          <Channels list={this.props.channels} />
          <div className="col-9">
            <div className="messages h-100"></div>
            <form className="form-group">
              <textarea className="form-control" required></textarea>
            </form>
          </div>
        </div>
      );
    }
  }

  return ReactDOM.render(<App channels={gon.channels} />, document.getElementById('chat'));
}
