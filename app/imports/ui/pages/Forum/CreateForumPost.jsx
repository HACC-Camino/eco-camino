import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Container, Form, Row } from 'react-bootstrap';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import { forumPostDefineMethod } from '../../../api/forum/ForumPostCollection.methods';

const CreateForumPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagList, setTagList] = useState('');

  const history = useHistory();
  const goToPage = (newID) => {
    const pageLink = `post/${newID}`;
    history.push(pageLink);
  };

  const handleSubmit = () => {
    if (title !== '' && content !== '') {
      // separate tags with commas
      const tags = tagList.replace(/\s/g, '').split(',');
      const date = new Date();
      const owner = Meteor.user().username;
      const type = 'main_post';
      forumPostDefineMethod.call({ date, type, title, content, tags, owner },
        (error, result) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Post Created Successfully', 'success');
            goToPage(result);
          }
        });
    }
  };

  return (
    <Container id="page-container">
      <Row className="pb-sm-2">
        <h2>Create Forum Post</h2>
      </Row>
      <Row>
        <Form>
          <Row>
            <Form.Group className='mb-3' controlId='formTitle'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                type='text'
                placeholder='Title'
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className='mb-3' controlId='formContent'>
              <Form.Label>Content</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={5}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group className='mb-3' controlId='formTagList'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                placeholder='Tags'
                onChange={(e) => setTagList(e.target.value)}
              />
              <Form.Text className='text-muted'>
                Please separate tags with commas.
              </Form.Text>
            </Form.Group>
          </Row>
          <Button type='submit' size='lg' onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default CreateForumPost;
