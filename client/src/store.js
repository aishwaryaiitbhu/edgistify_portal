import { createStore, applyMiddleware, compose } from "redux";//some libraries which help in creating storage for states of the application
import thunk from "redux-thunk";//middleware for redux, allows our api requests to pass through the reducers
import rootReducer from "./reducers"; //check the file for details
const initialState = {};//initial state of the application
const middleware = [thunk];//
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()//this line enables the browser to use the redux extension tools when the application is running
  )
);//creating the store for the application, which stores all the states

export default store;// exporting the store which is created
