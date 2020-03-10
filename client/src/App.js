import React, { Component } from "react"; //app.js file is the most importanr file ...if this is complied, then the app runs
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode"; //used for decoding the jwt token
import setAuthToken from "./utils/setAuthToken"; //check this file for details
import { setCurrentUser, logoutUser } from "./actions/authActions"; //check this file for details
import { Provider } from "react-redux"; //

import "./App.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import store from "./store"; //storage of all the states for the application, check the file for details 
import Dashboard from "./components/dashboard/Dashboard"; //Dashboard component, check the file for details
import { clearCurrentProfile } from "./actions/profileActions";//check the file for details
import PrivateRoute from "./components/common/PrivateRoute";//Private routes for non public routes, check for details
import CreateProfile from "./components/create-profile/CreateProfile";// create profile component
import EditProfile from "./components/edit-profile/EditProfile";//edit profile component
import AddExperience from "./components/add-creditentials/AddExperience";// add experience component
import AddEducation from "./components/add-creditentials/AddEducation";//add education component
import Profiles from "./components/profiles/Profiles";// All profiles component, (under a public route)
import Posts from "./components/posts/Posts";//Posts component
//check the components folder for each component details
//Check for token
if (localStorage.jwtToken) {            //localstorage stores all the authorization headers n login tokens
  //set the auth token and header auth using the setAuthToken which we imported
  setAuthToken(localStorage.jwtToken);
  //decode the token and get user information and expiration
  const decoded = jwt_decode(localStorage.jwtToken); //decode the jwt login token generated
  //set the current user using the payload in jwt token and isAuthenticated to true
  store.dispatch(setCurrentUser(decoded));
  // check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {  //decoded.exp is the expiry time of token
    //Logout user
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentProfile());
    //Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='App'>
            <Navbar />
            <Route exact path='/' component={Landing} />
            <div className='container'>
              <Route exact path='/register' component={Register} /> 
              <Route exact path='/login' component={Login} />
              <Route exact path='/profiles' component={Profiles} />
              <Switch>
                <PrivateRoute exact path='/dashboard' component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path='/create-profile'
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path='/edit-profile'
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path='/add-experience'
                  component={AddExperience}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path='/add-education'
                  component={AddEducation}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path='/feed' component={Posts} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
