import {CHANGE_LOCATION} from './types'

export function changeLocation(location: any) {
  return {
    type: CHANGE_LOCATION,
    payload: location
  }
}
