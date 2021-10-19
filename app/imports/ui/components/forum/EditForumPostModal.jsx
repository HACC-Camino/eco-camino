import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import { BsPencilSquare, BsXLg } from 'react-icons/all';

const EditForumPostModal = ({ post, show }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [tagList, setTagList] = useState(post.tags.join(', '));

  const handleModalClose = () => setModalOpen(false);
  const handleModalOpen = () => setModalOpen(true);

  const getTrigger = (type) => (type === 'main_post' ?
    <Button
      variant="outline-primary"
      className="mx-1"
      onClick={handleModalOpen}
    >
      Edit
    </Button>
    : <BsPencilSquare
      style={{ cursor: 'pointer', color: '#78c2ad' }}
      onClick={handleModalOpen}
    />);

  return (show ?
    <>
      {getTrigger(post.type)}
      <Modal
        show={modalOpen}
        onHide={handleModalClose}
      >
        <Modal.Header style={{ paddingTop: 15, paddingBottom: 15 }}>
          <h3>Edit {post.type === 'main_post' ? 'Post' : 'Reply'}</h3>
          <BsXLg style={{ cursor: 'pointer' }} onClick={handleModalClose}/>
        </Modal.Header>
        <Modal.Body>

        </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
      </Modal>
    </> :
      null);
};

EditForumPostModal.propTypes = {
  post: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
};

export default EditForumPostModal;
