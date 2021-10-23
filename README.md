Team Name: [HACCamino](https://hacc-camino.github.io/)

Deployed Site: [ECOCamino](https://eco-camino.meteorapp.com/#/)

## Overview 
ECOCamino is a web application designed to help registered users organize events such as cleanups and workshops, report trash or needed assistance, as well as promoting other non-profit organizations around the area. Our goal is to become a one way stop for people who want to contribute, but not know where to start. ECOCamino is designed to help communities team together to educate and address real threats to our ecosystems and increase environmental awareness among the public! Our application's goal is to build a community, host and attend events, connect with people through forums and accumulate points for participating. Registered users will be notified through real time notifications and can view their notifications when they sign into the application.

Disclaimer: On the link above, you will only be seeing the "built in 5 days" version of the web application. The team is still deciding on how we should proceed from here. We will be posting updates as soon as we can. Thank you very much.

## Preview 
Below are some screenshots of the web application using a sample user account and data.

### Landing Page
Upon entering the site, the user is greeted by the landing page. The landing page provides visitors a background of the app and the ability to sign in or create an account by clicking on the dropdown in the right corner.

![Landing Page](/doc/haccscreenshots/landing.png)

### Sign Up
New users can fill out the necessary fields to create an account. The zipcode connects them to their community.

![Sign Up](/doc/haccscreenshots/signup.png)

### Sign In
Returning users can log in via the Sign In button on the landing page.

![Sign In](/doc/haccscreenshots/login.png)

### Profile
Upon logging in, the user is taken to their profile. On the profile page, regsitered users are able to customize their information. They can view their upcoming events, past events attended and it is where their incentive points are displayed. 

![Profile](/doc/haccscreenshots/profile.png)

### Points
As registered users participate, they will redeem points for the following participation. To redeem points for events, members who attend the event will be given a unique code to verify through the **Verify Code** button.

![Points](/doc/haccscreenshots/points.png)

### Events 
Registered users can organize events and workshops around their community by adding an event and marking it on the google map. Here the user can see the events occuring around the community. They can narrow the list of Cleanups, Workshops and Events by choosing one of the five tabs:
* All Events
  * Contains all events in the community.
* Only Cleanups
  * Lists only the events created for Cleanups.
* Only Workshops
  * Lists only the events created for Workshops.
* Owned Events
  * Lists the events created by the user.
* Joined Events
  * Lists the events the user has joined. 
 
![Events](/doc/haccscreenshots/all-events.png)

### Add Event
Registered users can add an event by selecting *Add Event Page*. The user will provide the title, type of your event, date including start and end time, name, contact email, description, the address of the event, and marker on the google map. The events must be approved by admin before they are live. Once they are approved, the events can be joined by other users. Users can also leave events. 

![Add Event](/doc/haccscreenshots/addevent.png)

### Report Trash
Users can report trash or assistance. Similar to adding events, users will need a title, description, location, a marker and upload an image of the trash or needed assistance. Other users can adopt the report and clean up where its needed assistance.

![Report Trash](/doc/haccscreenshots/report-trash.png)

### Events and Reports On Map 
The location of the events and reports are marked on the map with a card displaying the information and its location.

![Event On Map](/doc/haccscreenshots/events.png)

### Forums 
Users can communicate with other members by creating and replying through forums.

![Forums](/doc/haccscreenshots/all-forums.png)

### Create Forum Post
To create a forum, users can click on the tab that will redirect them to fill out the Title, Content and Tags. The user can view all forums within the community and respond to them. They can also see their posts in its own tab.

![Create Forum Post](/doc/haccscreenshots/create-forum.png)

### Notifications
Notifcations appears in real time when a member interacts with another members report, event or forum. The notifications from being online and offline are viewable in the top right when the user clicks on the bell.

![Notfications](/doc/haccscreenshots/notifications.png)

### Admin Event Approval and Denial
Admin can approve or deny events and add feedback.

![Event Approval](/doc/haccscreenshots/eventapproval.png)

### Resources
Users can view and visit helpful links, and non profit organizations around their area. Users are able to learn more about these organizations and try to find what best fits their interests.

Disclaimer: We are not affiliated with any of the organizations seen on our page. We simply added them for demo purposes. Although we are open to working with them and other environmental organizations in the future.

![Resources](/doc/haccscreenshots/resources.png)

## Installation
Download and install the latest version of [Meteor](https://www.meteor.com/developers/install).
Bring up a shell, cd into the app directory and run the following commands locally:
```
meteor npm install
```
### Packages and Plug-ins
Install the latest version of [Bootstrap](https://react-bootstrap.github.io/getting-started/introduction/).
```
meteor npm install react-bootstrap bootstrap 
```
#### Amazon Web Services
[AWS](https://www.npmjs.com/package/aws-sdk)
```
npm install aws-sdk
```

#### Google Maps
[React Google Maps/API](https://www.npmjs.com/package/@react-google-maps/api)

[Google Maps Places API](https://www.npmjs.com/package/use-places-autocomplete)
```
npm install --save use-places-autocomplete
npm install --save-dev @types/googlemaps
``` 
The template of our map [Map Template](https://snazzymaps.com/style/8097/wy)

#### Others
[React Icons](https://www.npmjs.com/package/react-icons)
```
meteor npm install --save react-icons
```

[React Smart Data Table](https://www.npmjs.com/package/react-smart-data-table?activeTab=readme)
```
meteor npm install --save react-smart-data-table
```
[React Date Picker](https://www.npmjs.com/package/react-datepicker)
```npm install react-datepicker --save```

[React Select](https://www.npmjs.com/package/react-select)
```
yarn add react-select
```
[Generate Fake Data](https://www.npmjs.com/package/faker/)

[Combobox](https://reach.tech/combobox/)
```npm install @reach/combobox```

### Running The System
Once everything is installed, to run the app use the following command in the app directory:
```
meteor npm run start
```
If all goes well then the template application will appear at [http://localhost:3000](http://localhost:3000)

### UI Template
UI Bootstrap Template [Bootswatch: Minty](https://bootswatch.com/)

## Background of EcoCamino
EcoCamino was developed for the [2021 Meteor Hackathon](https://impact.meteor.com/hackathon). It was developed in five days by the team members listed below. The team consists of University of Hawai'i students majoring in Computer Science. The team is students of Dr. Johnson's ICS 491 class. It won first prize out of all the teams who competed.
Please find our personal contact in the links of **Our Team** for any further questions. 

## Our Team
- [Anna Campainha](https://annacampainha.github.io)
- [Daphne Marie Estacio](https://dmtapia.github.io)
- [Jerome Gallego](https://alohajerome.github.io/)
- [Michael Gainey](https://github.com/micgainey)
- [Timothy Huo](https://github.com/timothyhuo1)

---
* Template: [Meteor Application Template React Production](https://github.com/ics-software-engineering/meteor-application-template-react-production)
* By: [ICS Software Engineering](https://github.com/ics-software-engineering)
