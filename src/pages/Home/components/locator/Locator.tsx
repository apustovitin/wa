import React, {useState, useEffect, useRef}  from "react";

import { YMaps, Map, SearchControl } from "react-yandex-maps";

export const Locator = () => {
  const [location, setLocation] = useState([]);
  let searchControl: any;
  useEffect(() => {
    console.log('ComponentDidMount')
    console.log("loc", location)
  })
  return(
    <YMaps
      query={{ apikey: "ebd14675-19d0-4d07-be05-fa83f6baa37d" }}
    >
      <Map
        defaultState={{
          center: [55.751574, 37.573856],
          zoom: 9,
          controls: [],
        }}
        onClick={
          (e: any) => {
            console.log(e.get('coords'))
          }
        }
      >
        <SearchControl
          options={{ float: 'right' }}
          instanceRef={
            (ref) => {
              searchControl = ref
            }
          }
          onResultselect={
            (e: any) => {
              // Получает массив результатов.
              let results = searchControl.getResultsArray();
              // Индекс выбранного объекта.
              let selected = e.get('index');
              // Получает координаты выбранного объекта.
              let point = results[selected].geometry.getCoordinates();
              console.log(point)
              setLocation(point)
            }
          }
        />
      </Map>
    </YMaps>
  )
}
