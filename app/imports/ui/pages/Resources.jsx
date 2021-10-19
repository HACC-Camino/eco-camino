import React from 'react';
import { Container, Col, Row, Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const textStyle = { textAlign: 'center' };
class Resources extends React.Component {
  render() {
    return (
        <Container id="page-container">
          <Row className="py-sm-3">
            <h1 style={textStyle}>Resources</h1>
          </Row>
          <Row className="pb-sm-3">
              <Col style={textStyle} xs="6" sm="4" >
                <Card text="dark" className="mb-2">
                  <Card.Header>Tip #2</Card.Header>
                  <Card.Body>
                    <Card.Title>Ways to save water</Card.Title>
                    <Card.Text>
                      A recommended website about how to save our limited supply of water all around the world.
                    </Card.Text>
                    {/* eslint-disable-next-line max-len */}
                    <Button variant="success" href="https://friendsoftheearth.uk/sustainable-living/13-best-ways-save-water">Learn More</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col style={textStyle} xs="6" sm="4">
                <Card text="dark" className="mb-2">
                  <Card.Header>Tip #2</Card.Header>
                  <Card.Body>
                    <Card.Title>Learn about growing your own plants</Card.Title>
                    <Card.Text>
                      Instead of going to the grocery store to buy some vegetables, why not grow them in your backyard?
                    </Card.Text>
                    {/* eslint-disable-next-line max-len */}
                    <Button variant="success" href="https://blog.backtotheroots.com/2020/12/21/grow-your-own-food/">Learn More</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col style={textStyle} xs="6" sm="4">
                <Card text="dark" className="mb-2 ">
                  <Card.Header>Tip #3</Card.Header>
                  <Card.Body>
                    <Card.Title>Reduce, Reuse, Recycle!</Card.Title>
                    <Card.Text>
                      {/* eslint-disable-next-line max-len */}
                      A simple but effective practice to help save our already decline world that everyone should have knowledge of.
                    </Card.Text>
                    <Button variant="success" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Learn More</Button>
                  </Card.Body>
                </Card>
              </Col>
          </Row>
        <Row className="py-sm-3">
          <h3 style={textStyle}>Organizations</h3>
        </Row>
          <Row>
            <Col style={textStyle} xs="6" sm="4" >
              <Card text="dark" className="mb-2 cards">
                {/* eslint-disable-next-line max-len */}
                <Card.Img variant="top" src="/images/resource-page/sustainable_hawaii1.jpg" className="hawaiiConserve" />
                <Card.Body>
                  <Card.Title>Sustainable Coastlines Hawaii</Card.Title>
                  <Card.Text>
                   A small organization focused in educating others about better consumer behaviors and
                    continued coastal stewardship through cleanups, social media, and more.
                  </Card.Text>
                  <Button variant="primary" href="https://www.sustainablecoastlineshawaii.org/">Learn More</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col style={textStyle} xs="6" sm="4" >
              <Card text="dark" className="mb-2 cards">
                <Card.Img variant="top" src="/images/resource-page/kupu_logo.jpg" className="hawaiiConserve"/>
                <Card.Body>
                  <Card.Title>Kupu Hawaii</Card.Title>
                  <Card.Text>
                    A foundation that encourages young adults to learn about how they can serve their
                      communities through Service-Learning and Environmental Stewardship.
                  </Card.Text>
                  <Button variant="primary" href="https://www.kupuhawaii.org/">Learn More</Button>
                </Card.Body>
              </Card></Col>
            <Col style={textStyle} xs="6" sm="4" >
              <Card text="dark" className="mb-2 cards">
                <Card.Img variant="top" src="/images/resource-page/trees2_629x661.jpg" />
                <Card.Body>
                  <Card.Title>Trees For Honolulu&apos;s Future</Card.Title>
                  <Card.Text>
                    A foundation that strives to inform locals and residents to help create and
                    protect new trees as it can preserve and enhance our quality of life, especially in the face
                    of climate change.
                  </Card.Text>
                  <Button variant="primary" href="https://www.treesforhonolulu.org/">Learn More</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
    );
  }
}

export default Resources;
