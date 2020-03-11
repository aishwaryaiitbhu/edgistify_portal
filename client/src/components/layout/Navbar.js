//This is the Navrbar component, it will have states so we will use class based component
import React, { Component } from "react"; //all components created have to be inherited from Component class
import { Link } from "react-router-dom";//Link to other components
import PropTypes from "prop-types";//Defining attributes(props), already discussed the difference between props and states and why we need props
import { connect } from "react-redux";// connect our component to the store which we have created
import { logoutUser } from "../../actions/authActions";//an action which we need in this Navbar and we have to dispatch it
import { clearCurrentProfile } from "../../actions/profileActions";//also an action which we need after logging out the current user

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const authLinks = (
      <ul className='navbar-nav ml-auto'>
        <li className='nav-item'>
          <Link className='nav-link' to='/feed'>
            Posts
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/dashboard'>
            Dashboard
          </Link>
        </li>
        <li className='nav-item'>
          <a
            href=' '
            onClick={this.onLogoutClick.bind(this)}
            className='nav-link'
          >
            Logout
          </a>
        </li>
      </ul>
    );
    const guestLinks = (
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
      <nav className='navbar navbar-expand-sm navbar-dark bg-dark mb-4'>
        <div className='container'>
          <Link className='navbar-brand' to='/'>
            EDGISTIFY
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
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
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
//mapping state to props for the same reason as out store is huge, clearly defining which states can be resued and we map that to props
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
  Navbar
); //exporting the component created, it will be very beneficial if u see the syntax of 'connect' function, it takes two parameters,first the mapping of state to props, and second the actions which needs to be dispatched
//An action means an event associated with a component, like what happends if we click the logout button(some components do have actions associated to them and some dont have, so the second parameter in ''connect for those components will be set to empty or null)
