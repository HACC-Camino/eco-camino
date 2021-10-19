import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Modal, Row } from 'react-bootstrap';
import { BsPencilSquare, BsXLg } from 'react-icons/all';
import swal from 'sweetalert';
import { forumPostUpdateMethod } from '../../../api/forum/ForumPostCollection.methods';

const EditForumPostModal = ({ post, show }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [tagList, setTagList] = useState(post.tags.join(', '));
  const typeString = post.type === 'main_post' ? 'Post' : 'Reply';

  const handleModalClose = () => {
    setTitle(post.title);
    setContent(post.content);
    setTagList(post.tags.join(', '));
    setModalOpen(false);
    if (typeString === 'Reply') {
      // eslint-disable-next-line no-undef
      window.location.reload();
    }
  };
  const handleModalOpen = () => setModalOpen(true);

  const handleSubmit = () => {
    const tags = tagList.replace(/\s/g, '').split(',');
    forumPostUpdateMethod.call({ _id: post._id, title, content, tags },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', `${typeString} Updated Successfully`, 'success');
          handleModalClose();
        }
      });
  };

  return (show ?
    <>
      {typeString === 'Post' ?
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
        />
      }
      <Modal
        show={modalOpen}
        onHide={handleModalClose}
      >
        <Modal.Header style={{ paddingTop: 15, paddingBottom: 15 }}>
          <h3>Edit {typeString}</h3>
          <BsXLg style={{ cursor: 'pointer' }} onClick={handleModalClose}/>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Form.Group className='mb-3' controlId='formTitle'>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  disabled={typeString === 'Reply'}
                  type='text'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className='mb-3' controlId='formContent'>
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  value={content}
                  rows={5}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Form.Group>
            </Row>
            {typeString === 'Post' ?
              <Row>
                <Form.Group className='mb-3' controlId='formTagList'>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Tags'
                    value={tagList}
                    onChange={(e) => setTagList(e.target.value)}
                  />
                  <Form.Text className='text-muted'>
                    Please separate tags with commas.
                  </Form.Text>
                </Form.Group>
              </Row> : null
            }
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Footer style={{ paddingTop: 15, paddingBottom: 15 }}>
            <Button
              className="ml-1"
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Button
              variant="dark"
              className="ml-1"
              onClick={handleModalClose}
            >
              Cancel
            </Button>
          </Modal.Footer>
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
