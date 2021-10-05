import React, {useState, useEffect, useMemo, useRef}  from "react";
import { YMaps, Map, SearchControl } from "react-yandex-maps";
import {changeLocation} from '../../../../redux/actions'
import {connect, ConnectedProps} from 'react-redux';

const apiKey = '2de061f8c04b93186963134caf0421c2';
const LANG = 'ru';
const initialLocation = [55.75322, 37.622513];
interface Weather {
    [key: string]: string
};
type Props = {} & {} & {}

const Locator = (props: any) => {
  const [type, setType] = useState('minutely');
  const [location, setLocation] = useState(initialLocation);
  // const weather = useRef<Weather>({});
  const [name, setName]= useState('Москва');
  const [weather, setWeather] = useState<Weather>({});
  // weather.current = initialWeather
  let searchControl: any;
  useEffect(() => {
    console.log('ComponentDidMount')
    console.log("loc", location)
  })

  useEffect(() => {
    console.log("loc", location);
    const [latitude, longitude] = location;
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=${LANG}&units=metric`)
      .then(response => {
        console.log("response", response)
        return response.json()
      })
      .then(json => setWeather(json))
  }, [location])

  const logMapClick = (e: any) => {
    console.log('click at ', e.get('coords'))
  }
  const logSearchResult = (e: any) => {
    // Получает массив результатов.
    let results = searchControl.getResultsArray();
    // Индекс выбранного объекта.
    let selected = e.get('index');
    // Получает координаты выбранного объекта.
    let point = results[selected].geometry.getCoordinates();
    let name = results[selected].properties._data.name
    console.log('search result is: ', results[selected].properties._data.name)
    props.changeLocation({coordinates: point, name: name})
    setName(name)
    setLocation(point)
  }
  // console.log('cur', weather['current'])
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
        onClick={logMapClick}
      >
        <SearchControl
          options={{ float: 'right' }}
          instanceRef={
            (ref) => searchControl = ref
          }
          onResultselect={logSearchResult}
        />
      </Map>
    </YMaps>
    <h1>Прогноз в населелнном пункте {name}: {type}</h1>

    <button onClick={() => setType('minutely')}>По минутно</button>
    <button onClick={() => setType('hourly')}>По часам</button>
    <button onClick={() => setType('daily')}>По дням</button>
    <pre>{JSON.stringify(weather[type] , null, 2)}</pre>
    </>
  )
}

const mapDispatchToProps = {
  changeLocation
}

export default connect(
  null,
  mapDispatchToProps
)(Locator)
