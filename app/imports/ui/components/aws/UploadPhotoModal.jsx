import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { BsXLg } from 'react-icons/all';
import UploadPhotoButton from './UploadPhotoButton';

const UploadPhotoModal = ({ parentCallback }) => {
    const [show, setShow] = useState(false);
    const [data2, setData2] = useState(null);
    const handleClose = () => {
        setShow(false);
        parentCallback(data2);
    };
    const handleCallback = (childData2) => {
        setData2(childData2);
    };
    return (
        <>
            <Button onClick={() => setShow(true)}>Upload Photo</Button>
            <Modal
                size='sm'
                show={show}
                onHide={handleClose}
            >
                <Modal.Header>
                    <Modal.Title>Upload Photo</Modal.Title>
                    <BsXLg style={{ cursor: 'pointer' }} onClick={handleClose}/>
                </Modal.Header>
                <Modal.Body>
                    <UploadPhotoButton parentCallback2={handleCallback}/>
                </Modal.Body>
            </Modal>

        </>
    );
};

UploadPhotoModal.propTypes = {
    parentCallback: PropTypes.func.isRequired,
};

export default UploadPhotoModal;
