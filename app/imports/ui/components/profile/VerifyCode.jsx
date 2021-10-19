import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Container, FormControl, InputGroup, Modal } from 'react-bootstrap';
import swal from 'sweetalert';
import { BsXLg } from 'react-icons/all';
import { userUpdateMethod } from '../../../api/user/UserCollection.methods';

const VerifyCode = ({ eventIds, userDetail }) => {
    const [code, setCode] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    };
    const onSubmit = () => {
        let updateData = {};
        updateData = userDetail;
        updateData.usedCodes = [...userDetail.usedCodes];
        updateData.points = userDetail.points + 20;
        if (eventIds.includes(code) && !userDetail.usedCodes.includes(code)) {
            updateData.usedCodes.push(code);
            userUpdateMethod.call(updateData, (error) => (error ?
                swal('Error', error.message, 'error') :
                swal('Success', 'Data edited successfully', 'success')));
        } else {
            swal('Error', 'Key is already used.', 'error');
        }
        setCode('');
    };

    return (

        <Container className='mb-3'>
            <Button onClick={() => setShow(true)}>Verify Code</Button>
            <Modal
                size='md'
                show={show}
                onHide={handleClose}
            >
                <Modal.Header>
                    <Modal.Title>Verify Event Code</Modal.Title>
                    <BsXLg style={{ cursor: 'pointer' }} onClick={handleClose}/>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className='mb-3'>
                        <InputGroup.Text>code</InputGroup.Text>
                        <FormControl
                            placeholder='Enter your code here'
                            type='text'
                            value={code}
                            onChange={e => setCode(e.target.value)}
                        />
                    </InputGroup>
                    <Button onClick={onSubmit}>Submit</Button>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

VerifyCode.propTypes = {
    eventIds: PropTypes.array,
    userDetail: PropTypes.object,
};

export default VerifyCode;
