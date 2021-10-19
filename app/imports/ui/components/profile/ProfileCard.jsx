import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import EditProfileModal from './EditProfileModal';
import { GetPhoto } from '../aws/GetPhoto';

const ProfileCard = ({ userDetail }) => {

    if (userDetail.photoAWSKey === null) {
        // eslint-disable-next-line no-param-reassign
        userDetail.photoAWSKey = 'default-photo.png';
    }

    return (
        <Card style={{ width: '25rem' }}>
            {/* eslint-disable-next-line max-len */}
            <Card.Img variant="top" src={GetPhoto(userDetail.photoAWSKey)} />
            <Card.Body>
                <Card.Title as='h3'>{userDetail.firstName} {userDetail.lastName}</Card.Title>
                <Card.Subtitle as='h6'>Joined Date: {userDetail.dateJoined.toLocaleDateString()}</Card.Subtitle>
                <Row>
                    <Col><h6>AreaCode: {userDetail.areaCode}</h6></Col>
                    <Col><h6>Points Earned: {userDetail.points}</h6></Col>
                </Row>
                <Card.Text>
                    {userDetail.bio}
                </Card.Text>
                <EditProfileModal userDetail={userDetail}/>
            </Card.Body>
        </Card>
    );
};

ProfileCard.propTypes = {
    userDetail: PropTypes.object,
};

export default ProfileCard;
