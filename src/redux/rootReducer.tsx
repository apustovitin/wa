import {combineReducers} from 'redux';
import {locatorReducer} from './locatorReducer'

export const rootReducer = combineReducers({
  locator: locatorReducer,
});
