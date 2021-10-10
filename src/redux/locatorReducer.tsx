import {CHANGE_LOCATION, FETCH_WEATHER} from './types'

export type WeatherState = {
  coordinates: Array<number>,
  name: string,
  lang: string,
  weather: any
}

const initialState: WeatherState = {
  coordinates: [55.75322, 37.622513],
  name: 'Москва',
  lang: 'ru',
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
    default: return state
  }
}
