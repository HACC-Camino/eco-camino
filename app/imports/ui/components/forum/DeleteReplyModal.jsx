import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import { BsTrash, BsXLg } from 'react-icons/all';
import swal from 'sweetalert';
import { forumPostRemoveItMethod } from '../../../api/forum/ForumPostCollection.methods';

const DeleteReplyModal = ({ show, replyID }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalClose = () => setModalOpen(false);
  const handleModalOpen = () => setModalOpen(true);

  const handleDelete = () => {
    forumPostRemoveItMethod.call({ _id: replyID },
      (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Reply Deleted Successfully', 'success').then(() => {
          handleModalClose();
          // eslint-disable-next-line no-undef
          window.location.reload();
        });
      }
    });
  };

  return (show ?
    <>
      <BsTrash
        style={{ cursor: 'pointer', color: '#ff7851' }}
        className="mx-2"
        onClick={handleModalOpen}
      />
      <Modal
        show={modalOpen}
        onHide={handleModalClose}
      >
        <Modal.Header style={{ paddingTop: 15, paddingBottom: 15 }}>
          <h3>Delete Post</h3>
          <BsXLg style={{ cursor: 'pointer' }} onClick={handleModalClose}/>
        </Modal.Header>
        <Modal.Body>
          Are you sure you wanna delete this reply?
        </Modal.Body>
        <Modal.Footer style={{ paddingTop: 15, paddingBottom: 15 }}>
          <Button
            variant="outline-danger"
            className="mx-1"
            onClick={handleDelete}
          >
            Delete
          </Button>
          <Button
            variant="outline-dark"
            className="ml-1"
            onClick={handleModalClose}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    : null);
};

DeleteReplyModal.propTypes = {
  replyID: PropTypes.string,
  show: PropTypes.bool,
};

export default DeleteReplyModal;
