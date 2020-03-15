//Register user
import { GET_ERRORS, SET_CURRENT_USER } from "./types";// types for the kind of data we will dispatch after the response is recieved after an action(axios request)
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import axios from "axios";

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)//actual post request
    .then(res => history.push("/login"))//it returns a promise, then we will redirect to login, if successfull
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }) //if any errors occur, we will dispatch the type 'GET_ERRORS'( see the errorReducer) and with errors data as payload 
    );
};
//Login User request
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      //Save token to local storage
      const { token } = res.data;
      //Set token to ls
      localStorage.setItem("jwtToken", token);
      //Set token to auth header
      setAuthToken(token);
      //decode token to get user data
      const decoded = jwt_decode(token);
      //Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//Log user out
export const logoutUser = () => dispatch => {
  //Remove token from local storage
  localStorage.removeItem("jwtToken");
  //remove auth header for future requests
  setAuthToken(false);
  //Set the current user to {}
  dispatch(setCurrentUser({}));
};
