import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import { BsXLg } from 'react-icons/all';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import { forumPostRemoveItMethod } from '../../../api/forum/ForumPostCollection.methods';

const DeleteForumPostModal = ({ mainPostID, show, repliesID }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalClose = () => setModalOpen(false);
  const handleModalOpen = () => setModalOpen(true);

  const history = useHistory();
  const goToPage = () => {
    const pageLink = '/forum';
    history.push(pageLink);
  };

  const handleDelete = () => {
    repliesID.forEach(replyID => forumPostRemoveItMethod.call({ _id: replyID },
      (error2 => (error2 ? swal('Error', error2.message, 'error') : null))));
    forumPostRemoveItMethod.call({ _id: mainPostID },
      error => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Post Deleted Successfully', 'success').then(() => {
          goToPage();
          // eslint-disable-next-line no-undef
          window.location.reload();
        });
      }
    });
  };

  return (show ?
    <>
      <Button
        variant="outline-danger"
        className="ml-1"
        onClick={handleModalOpen}
      >
        Delete
      </Button>
      <Modal
        show={modalOpen}
        onHide={handleModalClose}
      >
        <Modal.Header style={{ paddingTop: 15, paddingBottom: 15 }}>
          <h3>Delete Post</h3>
          <BsXLg style={{ cursor: 'pointer' }} onClick={handleModalClose}/>
        </Modal.Header>
        <Modal.Body>
          Are you sure you wanna delete this post (and the replies)?
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

DeleteForumPostModal.propTypes = {
  mainPostID: PropTypes.string,
  show: PropTypes.bool,
  repliesID: PropTypes.array,
};

export default DeleteForumPostModal;
