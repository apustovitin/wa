import {combineReducers} from 'redux';

export type InitialState = {
  location: Array<number>,
  location_name: string
}

const initialState: InitialState = {
  location: [55.75322, 37.622513],
  location_name: 'Москва',
}

export const locatorReducer = (state: InitialState = initialState, action: any) => {
  return state
}
