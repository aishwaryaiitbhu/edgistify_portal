//Landing component, it has one state auth(a boolean variable which tells a user is authenticated or not)
import React, { Component } from "react";// We have to inherit from Component
import { Link } from "react-router-dom";//Links component to routes
import { PropTypes } from "prop-types";//for defining attributes of a component
// component k states r immutable, to make the components reusable, we define attributes or props or properties
import { connect } from "react-redux";//connects the component which we are creating(here it is the landing component) to the redux store which we have created and functions which dispaches actions which changes the states
// we r connecting this component to the store so that states get stored in it.
//An important point here is to note the difference between 'state' and 'props'
/*
a component's state cannot be modified from outside the component, like for example we have two components A and B and B is displaying info on the browser based on A, that means as the states on A change, those need to be reflected in B
but B's states cannot be modified from outside(here outside is the component A), so we define props of a component, which can be changed hence making the component dynamic
*/
// dynamic compoent means reusable component
class Landing extends Component {
  componentDidMount() {//a lifecycle method of a component, kind of like a constructor, called after the render method down below is called,here we will put the statements which are required after the render method outputs the HTML to the browser(depends on the functionality of our application, like here we want to check the auth state, if it is true then we just want to push the user to dashboard and if false, do nothing)
    // it is like a constructir bcos it is written at the very beginning of class declaration
    //componentDidMount method works after the render function displays all html code
    if (this.props.auth.isAuthenticated) {// we have defined the props below, checking if user is Authenticated
      // in every component, we have to define prop types, life cycle methods n map states to props.
      // If k bracket wala agar true hua, mtlab logged in h
      this.props.history.push("/dashboard"); // history means current path ya link
      
    }
  }
  /*
  <div className='landing'>(HTML which is to be rendered on the landing page) // entire class will be rendered
        <div className='dark-overlay landing-inner text-light'> // landing-inner means that the component which we r creating must be
        rendered inside
          <div className='container'> // every div tag when created neeeds a classname
            <div className='row'>
              <div className='col-md-12 text-center'>
                <h1 className='display-3 mb-4'>
                  Industry Portal for Employees
                </h1>
                <p className='lead'>
                  Share your ideas, share posts and get insights
                </p>
                <hr />
                <Link to='/register' className='btn btn-lg btn-info mr-2'>(link to register component) //btn is for button
                  Sign Up
                </Link>
                <Link to='/login' className='btn btn-lg btn-light'>(link to login component)
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
  */
  render() {
    return (
      <div className='landing'>
        <div className='dark-overlay landing-inner text-light'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12 text-center'>
                <h1 className='display-3 mb-4'>
                  Industry Portal for Employees
                </h1>
                <p className='lead'>
                  Share your ideas, share posts and get insights
                </p>
                <hr />
                <Link to='/register' className='btn btn-lg btn-info mr-2'>
                  Sign Up
                </Link>
                <Link to='/login' className='btn btn-lg btn-light'>
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
//defining the props of the landing component
Landing.propTypes = {
  auth: PropTypes.object.isRequired  //auth is an object which is required.
};
//mapping our state to props, needed as our store which we have created in App.js is huge, having a lots of states, we need to define clearly by thinking which state can be reused in this component(modified by outside) and map it to props
const mapStateToProps = state => ({ // we r doing mapping
  auth: state.auth // auth is a proptype n it is
});  // state.auth is auth state of the landing component 
export default connect(mapStateToProps)(Landing);//connecting the component to the redux store and exporting it  

