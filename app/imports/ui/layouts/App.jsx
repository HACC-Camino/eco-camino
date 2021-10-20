import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-bootstrap';
import NavBar1 from '../components/NavBar';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import Event from '../pages/Event/Event';
import AddEvent from '../pages/Event/AddEvent';
import AddReport from '../pages/Event/AddReport';
import AdminApprovalEvent from '../pages/Event/AdminApprovalEvent';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import Profile from '../pages/Profile';
import Resources from '../pages/Resources';
import 'bootswatch/dist/minty/bootstrap.min.css';
import Forum from '../pages/Forum/Forum';
import ForumPost from '../pages/Forum/ForumPost';
import AdminList from '../pages/AdminList';
import CreateForumPost from '../pages/Forum/CreateForumPost';
import ToastNotification from '../components/ToastNotification';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
const App = () => (
        <Router>
            <div>
                <NavBar1/>
                <Switch>
                    <Route exact path="/" component={Landing}/>
                    <Route path="/signin" component={Signin}/>
                    <Route path="/signup" component={Signup}/>
                    <ProtectedRoute path="/profile" component={Profile}/>
                    <ProtectedRoute path="/event" component={Event}/>
                    <ProtectedRoute path="/addEvent" component={AddEvent}/>
                    <ProtectedRoute path="/addReport" component={AddReport}/>
                    <Route path="/resources" component={Resources}/>
                    <ProtectedRoute path="/forum/home" component={Forum}/>
                    <ProtectedRoute path="/forum/post/:_id" component={ForumPost}/>
                    <ProtectedRoute path="/forum/create" component={CreateForumPost}/>
                    <AdminProtectedRoute path="/admin-list" component={AdminList}/>
                    <AdminProtectedRoute path="/approvalEvent" component={AdminApprovalEvent}/>
                    <ProtectedRoute path="/signout" component={Signout}/>
                    <Route component={NotFound}/>
                </Switch>
                <ToastContainer position='top-end' style={{}}>
                    <ToastNotification page={'app'}/>
                </ToastContainer>
                <Footer/>
            </div>
        </Router>
);

// const ToastNotification = () => {
//     const [message, setMessage] = useState('');
//     const [type, setType] = useState('');
//     const [forumId, setForumId] = useState('');
//
//     const current_date = new Date();
//     useTracker(() => {
//         Notifications.subscribeNotification();
//         Notifications.find({}).observeChanges({
//             added: (id, item) => {
//                 setMessage(item.message);
//                 setType(item.type);
//                 setForumId(item.forumID);
//                 // console.log(doc);
//                 if (item.dateCreated > current_date) {
//                     setShowToast(true);
//                     console.log(item);
//                 }
//             },
//         });
//     }, []);
//
//     return (
//
//     );
// };

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ?
          (<Component {...props} />) :
          (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
      );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
          const isLogged = Meteor.userId() !== null;
          const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
          return (isLogged && isAdmin) ?
              (<Component {...props} />) :
              (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
              );
        }}
    />
);

/** Require a component and location to be passed to each ProtectedRoute. */
ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.func.isRequired,
    PropTypes.object.isRequired,
  ]),
  location: PropTypes.object,
};

/** Require a component and location to be passed to each AdminProtectedRoute. */
AdminProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.func.isRequired,
    PropTypes.object.isRequired,
  ]),
  location: PropTypes.object,
};

export default App;
