import React from 'react';
import { Alert } from 'react-bootstrap';

const DeleteChannelModal = ({ requestState }) => (requestState === 'failed'
  ? <Alert variant={'danger'}>
      Something went wrong. Please try again!
    </Alert> : <p>Are you sure?</p>
);

export default DeleteChannelModal;
