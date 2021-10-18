import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Badge, Button, Card, Modal } from 'react-bootstrap';
import { BsXLg } from 'react-icons/all';
import { GetPhoto } from '../aws/GetPhoto';

require('react-bootstrap/ModalHeader');

const ProfilePreviewModal = ({ userDetail }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalClose = () => setModalOpen(false);
  const handleModalOpen = () => setModalOpen(true);

  return (
    <>
      <Badge bg='primary' as={Button} onClick={handleModalOpen}>
        {userDetail.firstName} {userDetail.lastName}
      </Badge>
        <Modal
          show={modalOpen}
          onHide={handleModalClose}
          size='sm'
        >
        <Modal.Header style={{ paddingTop: 15, paddingBottom: 15 }}>
          <div/>
          <BsXLg style={{ cursor: 'pointer' }} onClick={handleModalClose}/>
        </Modal.Header>
        <Modal.Body style={{ padding: 0 }}>
          <Card>
            <Card.Img variant="top" src={GetPhoto(userDetail.photoAWSKey)} />
            <Card.Body>
              <Card.Title as='h3'>{userDetail.firstName} {userDetail.lastName}</Card.Title>
              <Card.Text>
                Area Code: {userDetail.areaCode}
                <br/>
                Points Earned: {userDetail.points}
              </Card.Text>
              <Card.Text>{userDetail.bio}</Card.Text>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </>
  );
};

ProfilePreviewModal.propTypes = {
  userDetail: PropTypes.object,
};

export default ProfilePreviewModal;
