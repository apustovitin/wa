import {combineReducers} from 'redux';
import {locatorReducer} from './locatorReducer'
import {appReducer} from './appReducer'

export const rootReducer = combineReducers({
  locator: locatorReducer,
  app: appReducer,
});
