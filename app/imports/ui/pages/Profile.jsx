import React from 'react';
import ProfileCard from '../components/profile/ProfileCard';
import PlannedEvents from '../components/profile/PlannedEvents';

import PastEvents from '../components/profile/PastEvents';

class Profile extends React.Component {

    render() {
        return (
            <div className='container' style={{ paddingTop: '30px' }}>
                <div className='row row-cols-sm-2' style={{ paddingBottom: '30px' }}>
                    <div className='col-4'>
                        <ProfileCard/>
                    </div>

                    <div className='col-lg-8-auto'>
                        <div className='row' style={{ padding: '30px' }}>
                            <div className='card'>
                                <h3 className='card-title' style={{ padding: '10px' }}>My Events</h3>
                                <PlannedEvents/>
                            </div>
                        </div>

                        <div className='row' style={{ padding: '30px' }}>
                            <div className='card'>
                                <h3 className='card-title' style={{ padding: '10px' }}>Past Events</h3>
                                <PastEvents/>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Profile;
