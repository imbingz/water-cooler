import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ProfileModal(props) {
    return (
        <Modal {...props} aria-labelledby="contained-modal-title" backdrop="static" keyboard={false}>

            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title">Heading Text</Modal.Title>
            </Modal.Header>

            <Modal.Body>Modal content will sit here</Modal.Body>

            <Modal.Footer>

                <Button variant="secondary" onClick={props.onHide}>Close</Button>
                <Button variant="primary" onClick={props.onHide}>Submit</Button>

            </Modal.Footer>

        </Modal>
    );
}

export default ProfileModal;
