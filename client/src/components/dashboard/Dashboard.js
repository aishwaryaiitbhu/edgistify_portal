// if auth state is true, then pvt routes which were written in app.js will be functional
import React, { Component } from "react";
import PropTypes from "prop-types"; //for reusing components or making the components dynamic, we create props bcos states r immutable
import { connect } from "react-redux"; //connects components to store
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions"; // here dashboard is our component
//two actions r being imported
import Spinner from "../common/Spinner";//spinner or loading symbol
import { Link } from "react-router-dom"; // link tag
//in render, if u want to link to some component, we use LINK tag
import ProfileActions from "./ProfileActions"; // cutsom tags r made inside profile actions
import Experience from "./Experience"; // custom tags r made for experience // we can make custom tags
import Education from "./Education";

class Dashboard extends Component {   // class component is being inherited
  componentDidMount() { /// this is a life chycle method. Once, html part gets rendered, then these r called
    this.props.getCurrentProfile(); // for getting current profile
  }

  onDeleteClick() {
    this.props.deleteAccount(); // custom method
  }
  render() {
    const { user } = this.props.auth; // this is called destructuring. since this.props.auth has several attributes, n we have to pickup
    //only one, here user, then we use destructuring
    const { profile, loading } = this.props.profile; //loading is boolean, n profile is object, n we need these 2 from this.props.profile
    let dashboardContent; // let is used when we declare a variable n we r not initializing it

    if (profile === null || loading) {   // if profile object is null, ir no profile or loading attribute of proptype profile is true
      //then we see spinner... here loading is attribute of propytype profile
      dashboardContent = <Spinner />;  // if the above if condition is true, then we see the spinner ir dashboardcontent variable ll b spiner
    } else {
      //Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {   // oject.keys(profile) reyurns all profile values like email etc, its .length will give the length
          <div>  // container is starting
            <p className='lead text-muted'>  // this comes by default
              Welcome
              <Link to={`/profile/${profile.username}`}> {user.name}</Link> 
            </p>
            <ProfileActions /> 
            <Experience experience={profile.Experience} />  // experience being added to experience tag
            <Education education={profile.Education} />
            <div style={{ marginBottom: "60px" }} />  
            <button
              onClick={this.onDeleteClick.bind(this)} // binding the delete account function that we created above to this button
              className='btn btn-danger' // fr red colored button n also fr r the confirmation check that u want to delete d profile            >
              Delete my account
            </button>
          </div>
        );
      } else {
        //User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className='lead text-muted'>Welcome {user.name}</p>
            <p>You have not created a profile, please add some info</p>
            <Link to='/create-profile' className='btn btn-lg btn-info'> // linking the button to create profile component
              {" "}
              Create profile
            </Link>
          </div>
        );
      }
    }
// there is always a return inside render function
// now in the previous if-else if we decided what the dashboard content wud be, now we r displaying the contents
    return (
      <div className='dashboard'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <h1 className='display-4'>Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
//apart from creating props fr those states which we want reuse, those functions r also added in props which need to be dispactched frm store
Dashboard.propTypes = {   //creating props  
  getCurrentProfile: PropTypes.func.isRequired, //adding those functions which ll be dispatched frm stores for these componets
  deleteAccount: PropTypes.func.isRequired, //adding those functions which ll be dispatched frm stores for these componets
  auth: PropTypes.object.isRequired, // auth ia a proptyepe which we r creating
  profile: PropTypes.object.isRequired //profile is also a proptype we r creating
// sicne auth n prop will be used again n again, we r making proptypes fr them
};

const mapStateToProps = state => ({
  profile: state.profile,  // here in dashboard we have 2 states -profile n auth, we r mapping them to the appropriate props
  auth: state.auth
}); // our store is very big, there fr searching states, we need stores

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard  //  connect this component ie dashboard to the store. 
// mapping has to be passed in the connect funtion bcos our store is very big
//  { getCurrentProfile, deleteAccount } this is a list/array which have to be dispatched from store for this component
);
