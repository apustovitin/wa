import React, {useEffect}  from "react";
import { YMaps, Map, SearchControl, GeolocationControl } from "react-yandex-maps";
import {changeLocation, fetchWeather} from '../../../../redux/actions'
import {useDispatch, useSelector} from 'react-redux';
import s from './Locator.module.scss';



export const Locator = () => {
  let searchControl: any;
  const dispatch = useDispatch()
  const coordinates = useSelector((state: any) => state.locator.coordinates)
  useEffect(() => {
    dispatch(fetchWeather(coordinates, "ru"))
    let timerID = setInterval(
      () => dispatch(fetchWeather(coordinates, "ru")),
      60000
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

  const processGeoLocation = (e: any) => {
    let point = e.get('position');
    let ob = e.get('geoObjects');
    let name = ob.get(0).properties._data.name;
    dispatch(changeLocation({coordinates: point, name: name}));
  }

  return(
    <div className={s.this__day}>
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
          <GeolocationControl
            options={{ float: 'left' }}
            onLocationchange={processGeoLocation}
          />
        </Map>
      </YMaps>
    </div>
  )
}
