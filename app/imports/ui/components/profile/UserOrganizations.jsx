import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

class UserOrganizations extends React.Component {

    render() {
        return (
            <Container>
                <Card>
                    <Row>
                        <Col>
                            <img src='../../../../public/images/808cleanups.png' alt='' id='org_photos'/>
                        </Col>
                    </Row>
                </Card>
            </Container>
        );
    }
}

export default UserOrganizations;
