import { combineReducers } from 'redux'
import jobReducer from './jobsReducers'

export default combineReducers({
  jobsList: jobReducer,
})
