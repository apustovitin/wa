import React, {useState}  from "react";
import { YMaps, Map, SearchControl } from "react-yandex-maps";
import {changeLocation, fetchWeather} from '../../../../redux/actions'
import {connect} from 'react-redux';



const Locator = (props: any) => {
  const [type, setType] = useState('minutely');

  let searchControl: any;

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
    props.changeLocation({coordinates: point, name: name})
    props.fetchWeather(point)
  }
  return(
    <>
    <YMaps
      query={{ apikey: "" }}
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
    <pre>{JSON.stringify(props.weather[type] , null, 2)}</pre>
    </>
  )
}

const mapDispatchToProps = {
  changeLocation,
  fetchWeather
}

const mapStateToProps = (state:any) => {
  console.log("state in Locator", state)
  return {
    weather: state.locator.weather
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Locator)
