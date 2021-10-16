import React from 'react';
import { Grid } from 'semantic-ui-react';
import ProfileCard from '../components/profile/ProfileCard';
import PlannedEvents from '../components/profile/PlannedEvents';

class Profile extends React.Component {

    render() {
        return (

            <div>
                <Grid padded style={{ height: '100vh' }} centered>
                    <Grid.Row centered style={{ height: '55%' }} columns={2} >
                        <Grid.Column width={5}><ProfileCard/></Grid.Column>
                        <Grid.Column width={5}><PlannedEvents/></Grid.Column>
                    </Grid.Row>
                    <Grid.Row centered style={{ height: '55%' }} columns={2} >
                        <Grid.Column width={5}>
                            <h1>Joined Orgs</h1>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <h1>Past Events</h1>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default Profile;
