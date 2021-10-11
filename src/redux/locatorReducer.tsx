import {CHANGE_LOCATION, FETCH_WEATHER, CHANGE_TYPE} from './types'

export type WeatherState = {
  coordinates: Array<number>,
  name: string,
  lang: string,
  type: string,
  weather: any
}

const initialState: WeatherState = {
  coordinates: [55.75322, 37.622513],
  name: 'Москва',
  lang: 'ru',
  type: 'minutely',
  weather: {}
}

export const locatorReducer = (state: WeatherState = initialState, action: any) => {
  switch (action.type) {
    case CHANGE_LOCATION:
      return {
        ...state,
        coordinates: action.payload.coordinates,
        name: action.payload.name,
      }
    case FETCH_WEATHER:
      return { ...state, weather: action.payload }
    case CHANGE_TYPE:
      return { ...state, type: action.payload }
    default: return state
  }
}
