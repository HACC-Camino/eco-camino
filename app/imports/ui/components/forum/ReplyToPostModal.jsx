import React, { useState } from 'react';
import { Badge, Button, Card, Col, Form, Modal, Row, Table } from 'react-bootstrap';
import { BsXLg } from 'react-icons/all';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import { forumPostDefineMethod } from '../../../api/forum/ForumPostCollection.methods';
import { userUpdateMethod } from '../../../api/user/UserCollection.methods';
import { Notifications } from '../../../api/notification/NotificationCollection';

const ReplyToPostModal = ({ mainPost, mainPostOwner, currentUser }) => {
  const [content, setContent] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalClose = () => {
    setContent('');
    setModalOpen(false);
  };
  const handleModalOpen = () => setModalOpen(true);

  const handleSubmit = () => {
    if (content !== '') {
      const date = new Date();
      const type = 'reply';
      const mainThread = mainPost._id;
      const title = `Re: ${mainPost.title}`;
      const owner = Meteor.user().username;
      forumPostDefineMethod.call({ date, type, title, content, owner, mainThread },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Reply Sent Successfully', 'success').then(() => {
              handleModalClose();
              if (mainPostOwner._id !== currentUser._id) {
                userUpdateMethod.call({ _id: mainPostOwner._id, points: mainPostOwner.points + 2 });
                userUpdateMethod.call({ _id: currentUser._id, points: currentUser.points + 0.5 });
                // send notification to owner
              }
              // put in line 38
              const message = `Someone replied to your post: ${mainPost.title}! Click here to see what they said.`;
              Notifications.define({
                dateCreated: date,
                message: message,
                collectionType: 'forum',
                seen: false,
                forumID: mainPost._id,
                owner: mainPost.owner,
              });
            });
          }
        });
      // eslint-disable-next-line no-undef
      window.location.reload();
    }
  };

  return (
    <>
      <Button
        variant="outline-primary"
        className="ml-1"
        onClick={handleModalOpen}
        >
        Reply
      </Button>
      <Modal
        show={modalOpen}
        onHide={handleModalClose}
        size='lg'
      >
        <Modal.Header style={{ paddingTop: 15, paddingBottom: 15 }}>
          <h3>Reply Post</h3>
          <BsXLg style={{ cursor: 'pointer' }} onClick={handleModalClose}/>
        </Modal.Header>
        <Modal.Body>
            <Row style={{ overflow: 'auto', maxHeight: '25vh' }}>
              <Form>
                <Row>
                  <Form.Group className='mb-3' controlId='formTitle'>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      readOnly
                      type='text'
                      placeholder={`Re: ${mainPost.title}`}
                    />
                  </Form.Group>
                </Row>
                <Row className='mt-3'>
                  <Form.Group className='mb-3' controlId='formContent'>
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                      required
                      as="textarea"
                      rows={3}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </Form.Group>
                </Row>
              </Form>
            </Row>
          <hr/>
          <Row style={{ overflow: 'auto', maxHeight: '30vh' }}>
            <Col>
              <Card>
                <Card.Header as='h5'>
                  {mainPost.title}
                </Card.Header>
                <Card.Body>
                  <Table borderless className="fixed">
                    <tbody>
                    <tr>
                      <td width="80%">{mainPost.content}</td>
                      <td width="20%">
                        Posted By: {mainPost.owner}
                        <br/>
                        Date: {mainPost.date.toLocaleString()}
                        <br/>
                        Tags: {mainPost.tags.map(tag => <Badge
                        className="mx-1 bg-light text-primary"
                        key={tag}
                        pill>{tag}</Badge>)}
                      </td>
                    </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Modal.Body>
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
      </Modal>
    </>
  );
};

ReplyToPostModal.propTypes = {
  mainPost: PropTypes.object.isRequired,
  mainPostOwner: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
};

export default ReplyToPostModal;
