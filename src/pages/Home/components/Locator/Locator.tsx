import React, {useState, useEffect}  from "react";
import { YMaps, Map, SearchControl } from "react-yandex-maps";
import {changeLocation, fetchWeather} from '../../../../redux/actions'
import {useDispatch, useSelector} from 'react-redux';



export const Locator = () => {
  const [type, setType] = useState('minutely');
  let searchControl: any;
  const dispatch = useDispatch()
  const coordinates = useSelector((state: any) => state.locator.coordinates)
  useEffect(() => {
    dispatch(fetchWeather(coordinates))
    let timerID = setInterval(
      () => dispatch(fetchWeather(coordinates)),
      20000
    );
    return () => {
      clearInterval(timerID);
    }
  }, [coordinates, dispatch])

  const processMapClick = (e: any) => {
    console.log('click at ', e.get('coords'))
  }
  const processSearchResult = (e: any) => {
    // Получает массив результатов.
    let results = searchControl.getResultsArray();
    // Индекс выбранного объекта.
    let selected = e.get('index');
    // Получает координаты выбранного объекта.
    let point = results[selected].geometry.getCoordinates();
    let name = results[selected].properties._data.name
    console.log('search result is: ', results[selected].properties._data.name)
    dispatch(changeLocation({coordinates: point, name: name}))
    // setLocation(point)
  }
  return(
    <>
    <YMaps
      query={{ apikey: "ebd14675-19d0-4d07-be05-fa83f6baa37d" }}
    >
      <Map
        defaultState={{
          center: [55.751574, 37.573856],
          zoom: 9,
          controls: [],
        }}
        onClick={processMapClick}
      >
        <SearchControl
          options={{ float: 'right' }}
          instanceRef={
            (ref) => searchControl = ref
          }
          onResultselect={processSearchResult}
        />
      </Map>
    </YMaps>
    <h1>Прогноз: {type}</h1>

    <button onClick={() => setType('minutely')}>По минутно</button>
    <button onClick={() => setType('hourly')}>По часам</button>
    <button onClick={() => setType('daily')}>По дням</button>
    <pre>{JSON.stringify({type} , null, 2)}</pre>
    </>
  )
}
