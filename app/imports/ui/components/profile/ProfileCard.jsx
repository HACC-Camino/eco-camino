import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { BsXLg } from 'react-icons/all';
import EditProfileModal from './EditProfileModal';
import { GetPhoto } from '../aws/GetPhoto';
import VerifyCode from './VerifyCode';

const ProfileCard = ({ userDetail, eventIds }) => {

    if (userDetail.photoAWSKey === null) {
        // eslint-disable-next-line no-param-reassign
        userDetail.photoAWSKey = 'default-photo.png';
    }

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    };

    return (
        <Card style={{ width: '25rem' }}>
            {/* eslint-disable-next-line max-len */}
            <Card.Img variant="top" src={GetPhoto(userDetail.photoAWSKey)} />
            <Card.Body>
                <Card.Title as='h3'>
                        {userDetail.firstName} {userDetail.lastName}
                </Card.Title>
                <Card.Subtitle as='h6'>
                    <Row>
                        <Col>
                            Joined Date: {userDetail.dateJoined.toLocaleDateString()}
                        </Col>
                        <Col className='ml-0' style={{ verticalAlign: 'middle' }}>
                            <h6 style={{ textAlign: 'right' }}>Zip Code: {userDetail.zipCode}</h6>
                        </Col>
                    </Row>
                </Card.Subtitle>
                <Row>
                    <Col>
                        <h6 style={{ paddingTop: '5px' }}>
                            Points Earned: {userDetail.points}
                        </h6>
                    </Col>
                    <Col style={{ paddingLeft: '65px', paddingRight: '0px', paddingBottom: '10px' }}>
                        <Button onClick={() => setShow(true)} size='sm' >What are points?</Button>
                        <Modal
                            size='md'
                            show={show}
                            onHide={handleClose}
                        >
                            <Modal.Header>
                                <Modal.Title>What are points?</Modal.Title>
                                <BsXLg style={{ cursor: 'pointer' }} onClick={handleClose}/>
                            </Modal.Header>
                            <Modal.Body>
                                <h5>You can get:</h5>
                                <h6><strong>200 points</strong> for creating an event.</h6>
                                {/* eslint-disable-next-line max-len */}
                                <h6><strong>20 points</strong> for going to an event. Please enter the code given by the event host.</h6>
                                <h6><strong>3 points</strong> for reporting trash for others.</h6>
                                <h6><strong>2 points</strong> for every reply on your post that isn&apos;t you.</h6>
                                <h6><strong>0.5 points</strong> for replying to a post.</h6>
                                {/* eslint-disable-next-line max-len */}
                                <h6><strong>If you are one of the top 10 on the site you may apply to be a forum moderator.</strong></h6>
                            </Modal.Body>
                        </Modal>
                    </Col>
                </Row>
                <Card.Text>
                    {userDetail.bio}
                </Card.Text>
                <Row>
                    <Col>
                        <EditProfileModal userDetail={userDetail}/>
                    </Col>
                    <Col>
                        <VerifyCode userDetail={userDetail} eventIds={eventIds}/>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

ProfileCard.propTypes = {
    userDetail: PropTypes.object,
    eventIds: PropTypes.array,
};

export default ProfileCard;
