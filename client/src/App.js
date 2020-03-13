import React, { Component } from "react"; //app.js file is the most importanr file ...if this is complied, then the app runs
// component has been written in brackets bcos we r just importing a part from react. Examples of components r login n register
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; 
// react router dom is a router library. all public n private routes r made from it. 
//browser router is used for back button.
//switch is being imported bcos private routes r defines within switch
import jwt_decode from "jwt-decode"; //used for decoding the jwt token
// used for getting token expiry time, user login info n bearer token's actual value.
// bearer token is needed wherever there r auth headers. auth headers r areas where pvt token is needed.
import setAuthToken from "./utils/setAuthToken"; //check this file for details
import { setCurrentUser, logoutUser } from "./actions/authActions"; //check this file for details
import { Provider } from "react-redux"; // it will provide the store which we have created and imported here
// it will make available the Store which we have created. Store stores auth headers n app states.

import "./App.css";// layouts, text sizes,margins,background used globally  defined in this css file
// the dot n slash indicate that app.css file is in this folder itself
import Navbar from "./components/layout/Navbar";//Navbar component
import Footer from "./components/layout/Footer";//Footer component
import Landing from "./components/layout/Landing";//Landing component
import Register from "./components/auth/Register";//Register component
import Login from "./components/auth/Login";//Login component
import store from "./store"; //storage of all the states for the application, check the file for details 
// 'store' stores all states of application n autherization headers. if Store is not included, states ll nt be saved.
import Dashboard from "./components/dashboard/Dashboard"; //Dashboard component, check the file for details
import { clearCurrentProfile } from "./actions/profileActions";//check the file for details
// when logging out,the profile data must be deleted
import PrivateRoute from "./components/common/PrivateRoute";//Private routes for non public routes, check for details
// this private route has been put in switch bcos pvt routes r always put inside switch
import CreateProfile from "./components/create-profile/CreateProfile";// create profile component
import EditProfile from "./components/edit-profile/EditProfile";//edit profile component
import AddExperience from "./components/add-creditentials/AddExperience";// add experience component
import AddEducation from "./components/add-creditentials/AddEducation";//add education component
import Profiles from "./components/profiles/Profiles";// All profiles component, (under a public route) 
// when u use this, u will be able to see all the users profiles on the portal
import Posts from "./components/posts/Posts";//Posts component
//check the components folder for each component details
//Check for token
if (localStorage.jwtToken) {            //localstorage stores all the authorization headers n login tokens
  // the statement in bracket after IF checks whether login token is valid or not
  //set the auth token and header auth using the setAuthToken which we imported
  
  setAuthToken(localStorage.jwtToken); //jwt token is the login token.
  //LOCALSTORAGE.JWTTOKEN means bearer token ki value
  // setauthtoken assigns the value of bearer token to the authentication header of the pvt route
  //decode the token and get user information and expiration
  const decoded = jwt_decode(localStorage.jwtToken); //decode the jwt login token generated
  
  //payload means user information
  //const is is used to declare the constant decoded.
  store.dispatch(setCurrentUser(decoded)); //set the current user using the payload in jwt token and isAuthenticated to true
 
  //in store.dispacth, store stands fr the store we had created. dispatch means to dispatch some state or some action.
  
  const currentTime = Date.now() / 1000;  // check for expired token
  if (decoded.exp < currentTime) {  //decoded.exp is the expiry time of token
    //Logout user and clear current profile, which are imported 
    //these 2 actions ie logput user n clear current profile were imported n have to be dispatched from the store.
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentProfile());
    //Redirect to login, if token expired
    window.location.href = "/login";  //href is used fr hyperlinking
    //this pushes to login page if the expiry time has been passed.
  }
}
//below contains routes for all the components
//html code is always written within the render function.
// whatevere html is within the render, that comes out on the browseer screen
/*
<Provider store={store}> //Provider tag's attribute is store, n we r assigning it to that very store we had created n imported.
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
