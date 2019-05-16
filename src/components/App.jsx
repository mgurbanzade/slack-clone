import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/application.scss';
import '../../favicon.ico';
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Channels from './channels/Channels';
import ChannelHeader from './channels/ChannelHeader';
import Messages from './messages/Messages';
import MessageForm from './messages/MessageForm';
import ChannelActionsModal from './modals/ChannelActionsModal';

const App = () => (
  <Row className="vh-100">
    <Channels />
    <Col xs={9} className="d-flex flex-column">
      <ChannelHeader />
      <Messages />
      <MessageForm />
      <ChannelActionsModal />
    </Col>
  </Row>
);

export default App;
