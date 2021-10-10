import {CHANGE_LOCATION, FETCH_WEATHER, SHOW_LOADER, HIDE_LOADER, SHOW_ALERT, HIDE_ALERT} from './types'

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

export function showAlert(text: string) {
  return {
    type: SHOW_ALERT,
    payload: text
  }
}

export function hideAlert() {
  return {
    type: HIDE_ALERT
  }
}

export function fetchWeather(coordinates: Array<number>, lang: string) {
  const apiKey = '2de061f8c04b93186963134caf0421c2';
  const [latitude, longitude] = coordinates;
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=${lang}&units=metric`
  return async (dispatch: any) => {
    try {
      dispatch(showLoader())
      const response = await fetch(url)
      const json = await response.json()
      dispatch({type: FETCH_WEATHER, payload: json})
      dispatch(hideLoader())
      dispatch(hideAlert())
    }
    catch (e) {
      dispatch(showAlert('Ошибка загрузки данных о погоде с сервера.'))
      dispatch(hideLoader())
    }
  }
}
