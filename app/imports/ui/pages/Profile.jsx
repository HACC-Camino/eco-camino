import React from 'react';
import ProfileCard from '../components/profile/ProfileCard';
import PlannedEvents from '../components/profile/PlannedEvents';
import UserOrganizations from '../components/profile/UserOrganizations';

class Profile extends React.Component {

    render() {
        return (
            <div className='container' style={{ paddingTop: '30px' }}>
                <div className='row row-cols-sm-2' style={{ paddingBottom: '30px' }}>
                    <div className='col-sm-auto' >
                        <ProfileCard/>
                    </div>

                    <div className='col-sm-auto'>
                        <div className='card'>
                            <h3 className='card-title' style={{ padding: '10px' }}>My Events</h3>
                            <PlannedEvents/>
                        </div>
                    </div>

                </div>
                <div className='row row-cols-2'>
                    <div className='col-4'>
                        <UserOrganizations/>
                    </div>
                    <div className='col-8'>
                        <PlannedEvents/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
