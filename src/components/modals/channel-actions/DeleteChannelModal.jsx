import React from 'react';
import { Alert } from 'react-bootstrap';

const DeleteChannelModal = ({ requestState }) => (requestState === 'failed'
  ? <Alert variant={'danger'}>
      Something went wrong. Please
        <a href="#" className="text-primary" onClick={() => window.location.reload()}> try again!</a>
    </Alert> : <p>Are you sure?</p>
);

export default DeleteChannelModal;
