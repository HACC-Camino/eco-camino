import React, { useState } from 'react';
import { Button, Container, Form, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { BsXLg } from 'react-icons/all';
import swal from 'sweetalert';
import UploadPhotoButton from '../aws/UploadPhotoButton';
import { userUpdateMethod } from '../../../api/user/UserCollection.methods';

const EditProfileModal = ({ userDetail }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    };

    const [firstName, setFirstName] = useState(userDetail.firstName);
    const [lastName, setLastName] = useState(userDetail.lastName);
    const [bio, setBio] = useState(userDetail.bio);
    const [zipCode, setZipCode] = useState(userDetail.zipCode);
    // const [photoAWSKey, setPhotoAWSKey] = useState(userDetail.photoAWSKey);

    const [data, setData] = useState(null);
    const handleCallback = (childData) => {
        setData(childData);
    };

    const onSubmit = () => {
        const updateData = {};
        updateData._id = userDetail._id;
        updateData.firstName = firstName;
        updateData.lastName = lastName;
        updateData.bio = bio;
        updateData.zipCode = zipCode;
        updateData.photoAWSKey = data;
        userUpdateMethod.call(updateData, (error) => (error ?
            swal('Error', error.message, 'error') :
            swal('Success', 'Data edited successfully', 'success').then(handleClose)));

        // console.log(updateData);
    };

    return (
        <>
            <Button onClick={() => setShow(true)}>Edit Profile</Button>
            <Modal
                size='md'
                show={show}
                onHide={handleClose}
            >
                <Modal.Header>
                    <Modal.Title>Edit Profile</Modal.Title>
                    <BsXLg style={{ cursor: 'pointer' }} onClick={handleClose}/>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form>
                            <Form.Group className='mb-3' controlId='formFirstName'>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder={firstName}
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}/>
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='formLastName'>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder={lastName}
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}/>
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='formZipCode'>
                                <Form.Label>Zip Code</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder={zipCode}
                                    value={zipCode}
                                    onChange={e => setZipCode(e.target.value)}/>
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='formBio'>
                                <Form.Label>Bio</Form.Label>
                                <Form.Control
                                    as='textarea'
                                    rows={3}
                                    onChange={e => setBio(e.target.value)}/>
                            </Form.Group>
                        </Form>
                        <UploadPhotoButton parentCallback2={handleCallback}/>
                        {/* <h1>{data}</h1> */}
                        <Button variant='success' onClick={onSubmit} size='md'>Submit</Button>
                    </Container>
                </Modal.Body>
            </Modal>

        </>
    );
};

EditProfileModal.propTypes = {
    userDetail: PropTypes.object,
};

export default EditProfileModal;
