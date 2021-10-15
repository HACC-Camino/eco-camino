import React from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import Button from 'react-bootstrap/Button';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <Grid verticalAlign='middle' textAlign='center' container>
          <GridColumn>
              <Button size='lg' variant='success'>sup bro</Button>
          </GridColumn>
        </Grid>
    );
  }
}

export default Landing;
