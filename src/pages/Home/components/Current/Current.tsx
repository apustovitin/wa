import React from 'react';
// import { GlobalSvgSelector } from '../../../../assets/icons/global/GlobalSvgSelector';
import s from './Current.module.scss';
import {connect} from 'react-redux';
import {Loader} from '../Loader/Loader'

const Current = (props: any) => {
  if (props.loading || !props.weather.current) {
    return (
      <div className={s.this__day}>
        <Loader />
      </div>
    )
  }
  const icon = props.weather.current.weather[0]['icon'];
  const url = `http://openweathermap.org/img/wn/${icon}@2x.png`
  const description = props.weather.current.weather[0]['description'];
  const timezone = props.weather.timezone
  const timestamp = props.weather.current.dt * 1000
  let date = new Date(timestamp)
  let dateString = date.toLocaleDateString('ru-RU', { timeZone: timezone })
  let timeString = date.toLocaleTimeString('ru-RU', { timeZone: timezone })
  return (
    <div className={s.this__day}>
      <div className={s.top__block}>
        <div className={s.top__block_wrapper}>
          <div className={s.this__temp}>
            {Math.round(props.weather.current.temp)}°C
          </div>
          <img src={url} alt="icon url"/>
        </div>
        <div className={s.this__description}>
          {description}
        </div>
      </div>
      <div className={s.bottom__block}>
        <div className={s.this__date}>
          Дата: <span>{dateString}</span>
        </div>
        <div className={s.this__time}>
          Время: <span>{timeString}</span>
        </div>
        <div className={s.this__city}>
          Место: <span>{props.name}</span>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state:any) => {
  console.log("state in Current", state)
  return {
    name: state.locator.name,
    weather: state.locator.weather,
    loading: state.app.loading,
    alert: state.app.alert
  }
}

export default connect(
  mapStateToProps,
  null
)(Current)
