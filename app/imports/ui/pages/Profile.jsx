import React, { useState } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Col, Row, Spinner } from 'react-bootstrap';
import ProfileCard from '../components/profile/ProfileCard';
import PlannedEvents from '../components/profile/PlannedEvents';
import PastEvents from '../components/profile/PastEvents';
import { Events } from '../../api/event/EventCollection';
import { Users } from '../../api/user/UserCollection';
import { UserEvents } from '../../api/user/UserEventCollection';
// import UploadPhotoButton from '../components/aws/UploadPhotoButton';
import UploadPhotoModal from '../components/aws/UploadPhotoModal';
import GetPhoto from '../components/aws/GetPhoto';
import {GetPhoto1} from "../components/aws/GetPhoto1";

const Profile = ({ filtered_events, ready, userDetail, past_events }) => {

    // copy this for upload photo modal
    const [data, setData] = useState(null);
    const handleCallback = (childData) => {
        setData(childData);
    };

    return (ready ? (
        <div className='container' style={{ paddingTop: '30px' }}>
            <div className='row row-cols-sm-2' style={{ paddingBottom: '30px' }}>
                <Col sm={4} style={{ paddingBottom: '30px', paddingRight: '30px' }}>
                    <ProfileCard userDetail={userDetail} />
                </Col>

                <Col sm={8}>
                    <div className='row' style={{ paddingBottom: '30px' }}>
                        <div className='card'>
                            <h3 className='card-title' style={{ padding: '30px' }}>My Events</h3>
                            <PlannedEvents my_sorted_events_list={filtered_events}/>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='card'>
                            <h3 className='card-title' style={{ padding: '30px' }}>Past Events</h3>
                            <PastEvents past_events={past_events}/>
                        </div>
                    </div>
                </Col>

            </div>

            <Row>
                <Col><UploadPhotoModal parentCallback={handleCallback}/></Col>
                <Col>{data}</Col>
            </Row>
            <Row>
                <Col></Col>
            </Row>
        </div>
        ) : (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        )
    );
};

Profile.propTypes = {
    userDetail: PropTypes.object,
    ready: PropTypes.bool.isRequired,
    filtered_events: PropTypes.array,
    past_events: PropTypes.array,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
    // Get access to Event documents.
    const username = Meteor.user()?.username;
    const ready = Events.subscribeEventAdmin().ready()
        && Users.subscribeUser().ready()
        && UserEvents.subscribeUserEvent().ready()
        && username !== undefined;
    const events = Events.getEvenList();
    const userDetail = Users.getUserDetails(username);
    const userEvents = UserEvents.getUserEvent(username);
    const userOwner = Events.getUserEventList(username);
    const my_event_list = [];
    userEvents.forEach(userEvent => {
        const event = events.find(({ _id }) => userEvent.eventID === _id);
        my_event_list.push(event);
    });
    Array.prototype.push.apply(my_event_list, userOwner);
    const my_sorted_events_list_descending = my_event_list.slice().sort((a, b) => b.date - a.date).reverse();
    const my_sorted_events_list_ascending = my_event_list.slice().sort((a, b) => b.date - a.date);
    const filtered_events = my_sorted_events_list_descending.filter(new_filtered_events => {
        const current_date = new Date().getTime();
        return new_filtered_events.date > current_date;
    });
    const past_events = my_sorted_events_list_ascending.filter(past_filtered_events => {
        const current_date = new Date().getTime();
        return past_filtered_events.date < current_date;
    });
    // console.log(GetPhoto1({ photoAWSKey: '7qlRjzZMtEIUfbw62mSL5r1bC.jpg' }));
    return {
        ready,
        userDetail,
        filtered_events,
        past_events,
    };
})(Profile);
