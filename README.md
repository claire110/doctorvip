# Doctor Booking and Rating system

## Frontend: http://clairesite.com.au/doctor/frontend/index.html

  User1:
  * username: test
  * password: Test123456

  User2:
  * username: test1
  * password: Test123456

## Admin panel: https://clairesite.com.au.au/doctor-admin/

  Administrator:
  * username: admin
  * password: Test123456

## Business Roles:

In the Booking system,

*	Patients can choose their preferred doctors by comparing doctors’ introduction and feedback online. 

*	Patients can search for their preferred doctors or medical center name directly. 

*	A register/login system is required before making appointment.

*	Patients can only cancel their own appointment minimum 1 day before the appointment time.

*	Patients can access their own appointments history (included previous records). 

*	Rating function is available for patients to comment on doctors upon the completion of each doctor appointment. 

*	Patients can also update and delete their rating history.

*	Patients can only rate doctors they have had appointments.

admin panel:

*	Doctor’s primary profile can only be created or delete by administrator. 

*	Administrator can check, create, update and delete appointment plan for each doctor.

*	Administrator can view and delete all rating history.

*	Administration panel will be secured with an administration account separate to unprivileged users.



## Software Technology：

API:
*	The web service Server-Side Code will be written in pure PHP, as access control to a MySQL database. A defined set of get and post parameters will be used to interact with the Web Service, that in-turn manipulate a database 

User panel:
*	Front-end is written with HTML/CSS and JavaScript that communicates with the Web Service. 

*	The fetch API is used to key into the Web Service and render dynamic data in the front-end. This will function as a single page application, with some progressive web app features written with pure JavaScript. 

*	materialize(1.0.0) is needed to ease the implementation of UX.

* Handlebars(4.7.6) is used to build semantic templates and makes the template execution faster than most other template engines.

* MomentJS(2.29.1) is used to parsing, manipulating and displaying date/time.

Admin panel:
* Admin panel is a React project and set up with Create React App.

* Ant Design(4.8.4) as a very popular React UI library is used in the project for building rich, interactive UIs.


## Hosting and Hardware Requirements：

The deployment of server and client components will be in the cloud hosting services using CI/CD practices, such as Google Cloud Platform (GCP), Amazon Web Services (AWS), and Microsoft Azure.


## Current finished：

## USER PANEL:
### POST：
  * Login: 
    api/api.php?action=login
  * User Register: 
    api/api.php?action=userRegiste
  * Book Appointment 
    api/api.php?action=booking&planid='+ x
  * Add Rating: 
    api/api.php?action=addRating

### GET：
  * Login status:
    api/api.php?action=loggedin

  * User Logout:
    api/api.php?action=logout

  HOMEPAGE:
  * Show Doctor Information:
    api/api.php?action=showDoctorinfo
  * Show Rating Information:
    api/api.php?action=showRatinginfo
  * Show Available Appointments time:
    api/api.php?action=showAppinfo
  * Searching for doctor or medical center:
    api/api.php?action=showAppinfo

  APPOINTMENT HISTORY PAGE:
  * Show Appointment History:
    api/api.php?action=showAppHistory

  RATING MANAGEMENT:
  * Read rating:
    api/api.php?action=readRating&bookingid='+ x
  * Get Booking ID:
    api/api.php?action=getBookingid&bookingid='+ x
  * Add rating:
    api/api.php?action=addRating&bookingid='+ x
  * Update rating:
    api/api.php?action=updateRating&ratingid='+ x

### DELETE：
  * Delete Rating:
    api/api.php?action=delRating&ratingid='+ x
  * Cancel Appointment:
    api/api.php?action=cancelAppt&bookingid='+ x 

## ADMIN PANEL:
### GET:
  * Get doctor list:
    api/api.php?action=readDoctorName
   
  * Check available appointment:
    api/api.php?action=availableAppt

  * Check all rating history:
    api/api.php?action=allRatings
  
  * Check appointment details:
  api/api.php?action=apptDetail

### POST:
  * Login:
    api/api.php?action=adminLogin

  * Add new doctor:
    api/api.php?action=doctorRegister
   
  * Create appointment plan:
    api/api.php?action=apptPlan

  * Upload doctor image:
    api/api.php?action=upload

### DELETE:
  * Delete doctor:
    api/api.php?action=delDoctor
   
  * Delete appointment plan:
    api/api.php?action=delApptPlan

  * Delete ratings:
    api/api.php?action=adminDelRating

### Update:
  * Update appointment details:
    api/api.php?action=apptEdit

### OTHER FEATURES：
  * Rate Limit
  * Domain Lock
  * Logging(IP, Browser, User information, Action)
  * Validation

## installation 
 ### Front end(React):
 * Go to frontend folder run installscript.sh in Gitbash to install the project


 ### Admin panel(React):
 * In the project directory(reactapp folder), you can run:
  * npm start
    Runs the app in the development mode.
    Open http://localhost:3000 to view it in the browser.

    The page will reload if you make edits.
    You will also see any lint errors in the console.

  * npm run build
    Builds the app for production to the build folder.
    It correctly bundles React in production mode and optimizes the build for the best performance.#   d o c t o r v i p 
 
 