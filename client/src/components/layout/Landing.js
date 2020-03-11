//Landing component, it has one state auth(a boolean variable which tells a user is authenticated or not)
import React, { Component } from "react";// We have to inherit from Component
import { Link } from "react-router-dom";//Links component to routes
import { PropTypes } from "prop-types";//for defining attributes of a component
import { connect } from "react-redux";//connects the component which we are creating(here it is the landing component) to the redux store which we have created and functions which dispaches actions which changes the states

//An important point here is to note the difference between 'state' and 'props'
/*
a component's state cannot be modified from outside the component, like for example we have two components A and B and B is displaying info on the browser based on A, that means as the states on A change, those need to be reflected in B
but B's states cannot be modified from outside(here outside is the component A), so we define props of a component, which can be changed hence making the component dynamic
*/
class Landing extends Component {
  componentDidMount() {//a lifecycle method of a component, kind of like a constructor, called after the render method down below is called,here we will put the statements which are required after the render method outputs the HTML to the browser(depends on the functionality of our application, like here we want to check the auth state, if it is true then we just want to push the user to dashboard and if false, do nothing)
    if (this.props.auth.isAuthenticated) {// we have defined the props below, checking if user is Authenticated
      this.props.history.push("/dashboard");
    }
  }
  /*
  <div className='landing'>(HTML which is to be rendered on the landing page)
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
                <Link to='/register' className='btn btn-lg btn-info mr-2'>(link to register component)
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
  auth: PropTypes.object.isRequired
};
//mapping our state to props, needed as our store which we have created in App.js is huge, having a lots of states, we need to define clearly by thinking which state can be reused in this component(modified by outside) and map it to props
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(Landing);//connecting the component to the redux store and exporting it
