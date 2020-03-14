//This is the Navrbar component, it will have states so we will use class based component
//footer has no states, therefore we ll use functional based components
import React, { Component } from "react"; //all components created have to be inherited from Component class. react is a library
import { Link } from "react-router-dom";//Link to other components
import PropTypes from "prop-types";//Defining attributes(props), already discussed the difference between props and states and why we need props
import { connect } from "react-redux";// connect our component to the store which we have created
//react-redux is a library
//redux is also a library
import { logoutUser } from "../../actions/authActions";//an action which we need in this Navbar and we have to dispatch it from store, check file for more details
import { clearCurrentProfile } from "../../actions/profileActions";//also an action which we need after logging out the current user, check file for more details

class Navbar extends Component {
  //defining a custom function for logout and we will call the actions(which will be dispatched) which are associated with logout
  onLogoutClick(e) {//pass in an event 'e' 
    // custom functions always need an event 'e' as a parameter
    //custom functions r those which we make on our own
    
    e.preventDefault();//preventing the default action associated with the event
    this.props.clearCurrentProfile();//clear current profile(a part of props) 
    // these r actions being called. these actions have been created in a different file n have been imported above
    this.props.logoutUser();//logout user(a part of props)   // these r actions being called. these actions have been created in a different file n have been imported above
  } 

  render() {
    const { isAuthenticated } = this.props.auth;// destructuring to get the auth boolean from props
    // destructuring is when u have many attributes but need one, so brackets r used.
    //class k variables use krne k liy this keyword is being used. 
    //proptypes have been made below, n then if we have to access something from props, we do this.props. xxxxx
    //we will create two constants do be displayed in render, means if auth is true, we will display authlinks(means logged in links)
    //otherwise we will display guest links means those which will be displayed when someone visits who is not logged in
    const authLinks = (//logged in pr authlinks will be rendered
      <ul className='navbar-nav ml-auto'> //for left align
        <li className='nav-item'> //li tag is for list items
          <Link className='nav-link' to='/feed'>
            Posts
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/dashboard'> //push link to dashboard components
            Dashboard
          </Link>
        </li>
        <li className='nav-item'>
          <a  // a tag is used to bind event to logout button
            href=' ' //since we r logging out, therefore we need to bond logput event to this onclick
            onClick={this.onLogoutClick.bind(this)}
            className='nav-link'
          >
            Logout
          </a>
        </li>
      </ul>
    );
    const guestLinks = ( // this will be rendered to guests or people who r not logged in
      <ul className='navbar-nav ml-auto'>
        <li className='nav-item'>
          <Link className='nav-link' to='/register'>
            Sign Up
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/login'>
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className='navbar navbar-expand-sm navbar-dark bg-dark mb-4'> // by default
        <div className='container'> // div tags r used to make containers
          <Link className='navbar-brand' to='/'> // slash is being used to redirect it to landing page whose url is localhost3000/
            EDGISTIFY
          </Link>
          <button
            className='navbar-toggler' //button tag is for mobile layout
            type='button'
            data-toggle='collapse' //these attributes to scale aspect ratio wrt mobile
            data-target='#mobile-nav'
          >
            <span className='navbar-toggler-icon'></span>
          </button>

          <div className='collapse navbar-collapse' id='mobile-nav'>
            <ul className='navbar-nav mr-auto'>
              <li className='nav-item'>
                <Link className='nav-link' to='/profiles'>
                  {" "}
                  Know Others
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks} 
          </div>
        </div>
      </nav>
    );
  }
}
//defining props for Navbar component
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired, // logout user is a function which will be disbatched from store.
  auth: PropTypes.object.isRequired // auth is an object which has several attributes
};
//mapping state to props for the same reason as out store is huge, clearly defining which states can be resued and we map that to props
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
  Navbar
); //exporting the component created, it will be very beneficial if u see the syntax of 'connect' function, it takes two parameters,first the mapping of state to props, and second the actions which needs to be dispatched
//An action means an event associated with a component, like what happends if we click the logout button(some components do have actions associated to them and some dont have, so the second parameter in ''connect for those components will be set to empty or null)
