import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Form } from 'react-bootstrap';
import swal from 'sweetalert';
import UploadPhotoButton from '../aws/UploadPhotoButton';
import { userUpdateMethod } from '../../../api/user/UserCollection.methods';

const EditProfileForm = ({ userDetail }) => {
    const [firstName, setFirstName] = useState(userDetail.firstName);
    const [lastName, setLastName] = useState(userDetail.lastName);
    const [bio, setBio] = useState(userDetail.bio);
    const [areaCode, setAreaCode] = useState(userDetail.areaCode);
    const [photoAWSKey, setPhotoAWSKey] = useState(userDetail.photoAWSKey);

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
        updateData.areaCode = areaCode;
        // updateData.photoAWSKey = data;
        userUpdateMethod.call(updateData, (error) => (error ?
            swal('Error', error.message, 'error') :
            swal('Success', 'Data edited successfully', 'success')));
    };

    return (
        // <div>
        //     <h1>{firstName}</h1>
        //     <h1>{lastName}</h1>
        //     <h1>{bio}</h1>
        //     <h1>{areaCode}</h1>
        // </div>
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

                <Form.Group className='mb-3' controlId='formAreaCode'>
                    <Form.Label>Area Code</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder={areaCode}
                        value={areaCode}
                        onChange={e => setAreaCode(e.target.value)}/>
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
            {/*<h1>{data}</h1>*/}
            <Button variant='success' onClick={onSubmit} size='md'>Submit</Button>
        </Container>
    );
};

EditProfileForm.propTypes = {
    userDetail: PropTypes.object,
};

export default EditProfileForm;
