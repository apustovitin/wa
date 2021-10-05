import {CHANGE_LOCATION} from './types'

export type LocationState = {
  coordinates: Array<number>,
  name: string
}

const initialState: LocationState = {
  coordinates: [55.75322, 37.622513],
  name: 'Москва',
}

export const locatorReducer = (state: LocationState = initialState, action: any) => {
  switch (action.type) {
    case CHANGE_LOCATION:
      return {
        coordinates: action.payload.coordinates,
        name: action.payload.name,
      }
    default: return state
  }
}
