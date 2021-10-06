import {CHANGE_LOCATION, FETCH_WEATHER, SHOW_LOADER, HIDE_LOADER} from './types'

export function changeLocation(location: any) {
  return {
    type: CHANGE_LOCATION,
    payload: location
  }
}

export function showLoader() {
  return {
    type: SHOW_LOADER
  }
}

export function hideLoader() {
  return {
    type: HIDE_LOADER
  }
}

export function fetchWeather(coordinates: Array<number>) {
  const apiKey = '';
  const LANG = 'ru';
  const [latitude, longitude] = coordinates;
  return async (dispatch: any) => {
    dispatch(showLoader())
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=${LANG}&units=metric`)
    const json = await response.json()
    dispatch({type: FETCH_WEATHER, payload: json})
    dispatch(hideLoader())
  }
}
