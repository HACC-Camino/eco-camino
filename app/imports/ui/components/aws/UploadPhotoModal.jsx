import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import UploadPhotoButton from './UploadPhotoButton';

const UploadPhotoModal = () => {
    const [show, setShow] = useState(false);

    return (
        <>
            <Button onClick={() => setShow(true)}>Upload Photo</Button>
            <Modal
                size='sm'
                show={show}
                onHide={() => setShow(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Upload Photo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UploadPhotoButton/>
                </Modal.Body>
            </Modal>

        </>
    );
};

export default UploadPhotoModal;
