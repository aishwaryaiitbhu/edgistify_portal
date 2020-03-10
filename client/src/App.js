import React, { Component } from "react"; //app.js file is the most importanr file ...if this is complied, then the app runs
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode"; //used for decoding the jwt token
import setAuthToken from "./utils/setAuthToken"; //check this file for details
import { setCurrentUser, logoutUser } from "./actions/authActions"; //check this file for details
import { Provider } from "react-redux"; // it will provide the store which we have created and imported here

import "./App.css";// layouts, text sizes,margins,background used globally  defined in this css file
import Navbar from "./components/layout/Navbar";//Navbar component
import Footer from "./components/layout/Footer";//Footer component
import Landing from "./components/layout/Landing";//Landing component
import Register from "./components/auth/Register";//Register component
import Login from "./components/auth/Login";//Login component
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
    //Logout user and clear current profile, which are imported
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentProfile());
    //Redirect to login, if token expired
    window.location.href = "/login";
  }
}
//below contains routes for all the components
/*
<Provider store={store}>
        <Router>
          <div className='App'>
            <Navbar />
            <Route exact path='/' component={Landing} />(landing component route)(exact path is used so that the exact route name is matched when this route is called, eg... '/'and '/register', both have similar startings)
            <div className='container'>
              <Route exact path='/register' component={Register} /> (register component route)
              <Route exact path='/login' component={Login} />(Login Component route)
              <Route exact path='/profiles' component={Profiles} />(profiles route)
              <Switch>(private route for dashboard)
                <PrivateRoute exact path='/dashboard' component={Dashboard} />
              </Switch>
              <Switch>(private route for creating profile)
                <PrivateRoute
                  exact
                  path='/create-profile'
                  component={CreateProfile}
                />
              </Switch>
              <Switch>(private route for editing profile)
                <PrivateRoute
                  exact
                  path='/edit-profile'
                  component={EditProfile}
                />
              </Switch>
              <Switch>(Adding experience private route)
                <PrivateRoute
                  exact
                  path='/add-experience'
                  component={AddExperience}
                />
              </Switch>
              <Switch>(adding education private route)
                <PrivateRoute
                  exact
                  path='/add-education'
                  component={AddEducation}
                />
              </Switch>
              <Switch>(post fedd route)
                <PrivateRoute exact path='/feed' component={Posts} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
*/
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
