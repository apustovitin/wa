import React, {useState, useEffect, useMemo, useRef}  from "react";
import { YMaps, Map, SearchControl } from "react-yandex-maps";

const apiKey = '2de061f8c04b93186963134caf0421c2';
interface Weather {
    [key: string]: string
};

export const Locator = () => {
  const [type, setType] = useState('minutely');
  const [location, setLocation] = useState([55.75322, 37.622513]);
  const weather = useRef<Weather>({});
  const weatherList = useRef<any>([]);
  // const [weather, setWeather] = useState<Weather>();
  let searchControl: any;
  useEffect(() => {
    console.log('ComponentDidMount')
    console.log("loc", location)
  })

  useEffect(() => {
    console.log("loc", location);
    const [latitude, longitude] = location;
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
      .then(response => {
        console.log("response", response)
        return response.json()
      })
      .then(json => weather.current = json)
  }, [location])

  // useEffect(() => {
  //   weatherList.current = weather.current[type]
  // }, [type])

  // weather = useMemo(() => {
  //   const [latitude, longitude] = location;
  //   let w = {}
  //   fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
  //     .then(response => {
  //       console.log("response", response)
  //       return response.json()
  //     })
  //     .then(json => w = json)
  //     return w
  // }, [location])
  //
  // const weatherList = useMemo(() => {
  //   return weather.current[type]
  // }, [type])

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
    console.log('search result is: ', point)
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
    <h1>Прогноз: {type}</h1>

    <button onClick={() => setType('minutely')}>По минутно</button>
    <button onClick={() => setType('hourly')}>По часам</button>
    <button onClick={() => setType('daily')}>По дням</button>
    <pre>{JSON.stringify(weather.current[type] , null, 2)}</pre>
    </>
  )
}
