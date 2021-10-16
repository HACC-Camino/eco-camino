import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

class ProfileCard extends React.Component {
    render() {
        return (
            <Card style={{ width: '28rem' }}>
                {/* eslint-disable-next-line max-len */}
                <Card.Img variant="top" src="data:image/png;base64,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" />
                <Card.Body>
                    <Card.Title>NAME GOES HERE</Card.Title>
                    <Card.Subtitle>Joined date goes here</Card.Subtitle>
                    <Card.Text>
                        Persons Bio goes here.
                    </Card.Text>
                    <ListGroup>
                        <ListGroup.Item>Area</ListGroup.Item>
                        <ListGroup.Item>Points</ListGroup.Item>
                        <ListGroup.Item>
                            <Button>Edit</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        );
    }
}

export default ProfileCard;
