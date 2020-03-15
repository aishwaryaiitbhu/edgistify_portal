import React, { Component } from "react";//we are creating a class based component, so we have to inherit from Component
import PropTypes from "prop-types";// for defining props
//import axios from "axios";
import { withRouter } from "react-router-dom"; //used to redirect to another component from within the action
//import classnames from "classnames";
import { connect } from "react-redux";//connecting the component to the store we created
import { registerUser } from "../../actions/authActions";//action for this component
import TextFieldGroup from "../common/TextFieldGroup";//custom tag TextFieldGroup with attributes, check file for details

class Register extends Component {
  constructor() {
    super();// to call parent class constructor
    this.state = { //initial state is empty
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this); //binding the onChange method to 'this' so that it is accessed by calling from 'this' keyword
    this.onSubmit = this.onSubmit.bind(this);//binding the onSubmit method to 'this' so that it is accessed by calling from 'this' keyword
  }
  componentDidMount() {// lifecylce method, here we will put those statements which will be there after the HTML has been rendered on the browser
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard"); //push to dashboard if user is logged in
    }
  }
  componentWillReceiveProps(nextProps) {// another lifecycle method, runs when our component is reused(means it recieves new props)
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });//if errors are recieved as new props, set the errors state using this.setState(can only be called outside an action)
    }
  }
  onChange(e) {// to change the HTML rendered, ie when user inputs new values in the text field etc.
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) { // a function to be called on submitting the registration form, takes in an event e
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };//new user's values will be set from state

    this.props.registerUser(newUser, this.props.history); //we have imported the withRouter, hence we can pass this.props.history and we have delcared the redirect logic inside the registerUser action as second parameter
  }

  render() {
    const { errors } = this.state;
    //const { user } = this.props.auth;
    return (
      /*
      <div className='register'>
        <div className='container'>(A container inside the main div tag)
          <div className='row'>(a row)
            <div className='col-md-8 m-auto'>(a div tag with auto align and margin)
              <h1 className='display-4 text-center'>Sign Up</h1>
              <p className='lead text-center'>Create your account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup(TextFiekdGroup custom tag for name)
                  placeholder='Name'
                  name='name'
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup(TextFiekdGroup custom tag for email)
                  placeholder='Email Address'
                  name='email'
                  type='email'
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                <TextFieldGroup(TextFiekdGroup custom tag for password)
                  placeholder='Password'
                  name='password'
                  type='password'
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <TextFieldGroup(TextFiekdGroup custom tag for Password conf)
                  placeholder='Confirm Password'
                  name='password2'
                  type='password'
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />
                <input type='submit' className='btn btn-info btn-block mt-4' />
              </form>
            </div>
          </div>
        </div>
      </div>
      */
      <div className='register'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <h1 className='display-4 text-center'>Sign Up</h1>
              <p className='lead text-center'>Create your account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder='Name'
                  name='name'
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder='Email Address'
                  name='email'
                  type='email'
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                <TextFieldGroup
                  placeholder='Password'
                  name='password'
                  type='password'
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <TextFieldGroup
                  placeholder='Confirm Password'
                  name='password2'
                  type='password'
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />
                <input type='submit' className='btn btn-info btn-block mt-4' />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
//props for this component
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired 
};

const mapStateToProps = state => ({ auth: state.auth, errors: state.errors });//mapping from state to props

export default connect(mapStateToProps, { registerUser })(withRouter(Register));//withrouter is used here
