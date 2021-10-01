import React, {useState, useEffect, useMemo, useRef}  from "react";
import { YMaps, Map, SearchControl } from "react-yandex-maps";

const apiKey = '2de061f8c04b93186963134caf0421c2';
const LANG = 'ru';
const initialLocation = [55.75322, 37.622513];
interface Weather {
    [key: string]: string
};

//
// let initialWeather: Weather;
// const request = async (location: Array<number>) => {
//   const [latitude, longitude] = location;
//   const weatherPromise = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=${LANG}&units=metric`)
//     .then(response => response.json())
//     .then(json => json)
//   return weatherPromise;
// }
// const callRequest = async () => {
//   initialWeather = await request(initialLocation);
//   console.log("initialWeather", initialWeather);
// }
//
// callRequest();





export const Locator = () => {
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
    let name = results[selected].properties._data.name
    console.log('search result is: ', results[selected].properties._data.name)
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
