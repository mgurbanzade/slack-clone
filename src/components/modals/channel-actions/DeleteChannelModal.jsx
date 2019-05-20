import React from 'react';
import { Alert } from 'react-bootstrap';

const DeleteChannelModal = ({ requestState }) => {
  const alert = (
    <Alert variant={'danger'}>
      Something went wrong. Please
        <a href="#" className="text-primary" onClick={() => window.location.reload()}> try again!</a>
    </Alert>
  );

  const body = (<p>Are you sure?</p>);
  return requestState === 'failed' ? alert : body;
};

export default DeleteChannelModal;
