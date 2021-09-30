import React, {useState, useEffect, useRef}  from "react";
import { YMaps, Map, SearchControl } from "react-yandex-maps";

const apiKey = '';

export const Locator = () => {
  const [location, setLocation] = useState([55.75322, 37.622513]);
  const [currnetWeather, setWeather] = useState({});
  let searchControl: any;
  // useEffect(() => {
  //   console.log('ComponentDidMount')
  //   console.log("loc", location)
  // })
  useEffect(() => {
    console.log("loc", location);
    const [latitude, longitude] = location;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
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
    console.log('search result is: ', point)
    setLocation(point)
  }

  const fetchLocationWeather = () => {
    return new Array()
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
    <pre>{JSON.stringify(currnetWeather, null, 2)}</pre>
    </>
  )
}
