import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      status: "",
      company: "",
      website: "",
      skills: "",
      linkedin: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      const skillsCSV = profile.skills.join(",");
      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.linkedin = !isEmpty(profile.linkedin) ? profile.linkedin : "";
      this.setState({
        username: profile.username,
        status: profile.status,
        company: profile.company,
        website: profile.website,
        skills: skillsCSV,
        linkedin: profile.linkedin
      });
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const profileData = {
      username: this.state.username,
      status: this.state.status,
      company: this.state.company,
      website: this.state.website,
      skills: this.state.skills,
      linkedin: this.state.linkedin
    };
    this.props.createProfile(profileData, this.props.history);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    //select options for status
    const options = [
      { label: "Select your status", value: 0 },
      { label: "Full stack developer", value: "Full stack developer" },
      { label: "Software Engineer", value: "Software Engineer" },
      { label: "Analyst", value: "Analyst" },
      { label: "Data scientist", value: "Data scientist" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" }
    ];
    return (
      <div className='create-profile'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <h1 className='display-4 text-center'>Edit profile</h1>

              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder='Username'
                  name='username'
                  value={this.state.username}
                  onChange={this.onChange}
                  error={errors.username}
                  info='A unique username for your profile'
                />
                <SelectListGroup
                  placeholder='Status'
                  name='status'
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                  info='Select your status'
                />
                <TextFieldGroup
                  placeholder='Company'
                  name='company'
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info='Your workplace'
                />
                <TextFieldGroup
                  placeholder='Website'
                  name='website'
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info='Your website'
                />
                <TextFieldGroup
                  placeholder='Skills'
                  name='skills'
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info='Please use comma to seperate'
                />
                <TextFieldGroup
                  placeholder='LinkedIn'
                  name='linkedin'
                  value={this.state.linkedin}
                  onChange={this.onChange}
                  error={errors.linkedin}
                  info='Your LinkedIn'
                />
                <input
                  type='submit'
                  value='Submit'
                  className='btn btn-info btn-block mt-4'
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
