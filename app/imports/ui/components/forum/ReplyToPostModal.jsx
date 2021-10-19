import React, { useState } from 'react';
import { Badge, Button, Card, Col, Form, Modal, Row, Table } from 'react-bootstrap';
import { BsXLg } from 'react-icons/all';
import PropTypes from 'prop-types';

const ReplyToPostModal = ({ mainPost, currentUser }) => {
  const [content, setContent] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalClose = () => setModalOpen(false);
  const handleModalOpen = () => setModalOpen(true);

  const handleSubmit = () => {
    if (content !== '') {
      console.log(content);
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
  mainPost: PropTypes.object,
  currentUser: PropTypes.string,
};

export default ReplyToPostModal;
