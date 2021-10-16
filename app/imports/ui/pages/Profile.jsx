import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Col, Spinner } from 'react-bootstrap';
import ProfileCard from '../components/profile/ProfileCard';
import PlannedEvents from '../components/profile/PlannedEvents';
import PastEvents from '../components/profile/PastEvents';
import { Events } from '../../api/event/EventCollection';
import { Users } from '../../api/user/UserCollection';

const Profile = ({ events, ready, userDetail }) => (ready ? (
    <div className='container' style={{ paddingTop: '30px' }}>
        <div className='row row-cols-sm-2' style={{ paddingBottom: '30px' }}>
            <Col sm={4} style={{ paddingBottom: '30px', paddingRight: '30px' }}>
                <ProfileCard userDetail={userDetail} />
            </Col>

            <Col sm={8}>
                <div className='row' style={{ paddingBottom: '30px' }}>
                    <div className='card'>
                        <h3 className='card-title' style={{ padding: '30px' }}>My Events</h3>
                        <PlannedEvents/>
                    </div>
                </div>

                <div className='row'>
                    <div className='card'>
                        <h3 className='card-title' style={{ padding: '30px' }}>Past Events</h3>
                        <PastEvents/>
                    </div>
                </div>
            </Col>

        </div>
    </div>
    ) : (
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    )
);

Profile.propTypes = {
    events: PropTypes.array.isRequired,
    userDetail: PropTypes.object,
    ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
    // Get access to Event documents.
    const username = Meteor.user()?.username;
    const ready = Events.subscribeEvent().ready()
        && Users.subscribeUser().ready()
        && username !== undefined;
    const events = Events.getEvenList();
    const userDetail = Users.getUserDetails(username);
    return {
        ready,
        events,
        userDetail,
    };
})(Profile);
