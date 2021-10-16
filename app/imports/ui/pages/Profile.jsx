import React from 'react';
import ProfileCard from '../components/profile/ProfileCard';
import PlannedEvents from '../components/profile/PlannedEvents';

class Profile extends React.Component {

    render() {
        return (
            <div className='container' style={{ paddingTop: '30px' }}>
                <div className='row row-cols-sm-2' style={{ paddingBottom: '30px' }}>
                    <div className='col-4'>
                        <ProfileCard/>
                    </div>
                    <div className='col-lg-8-auto'>
                        <div className='card'>
                            <h3 className='card-title' style={{ padding: '10px' }}>My Events</h3>
                            <PlannedEvents/>
                        </div>

                    </div>
                </div>
                <div className='row row-cols-2'>
                    <div className='col-4'>
                        <PlannedEvents/>
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
