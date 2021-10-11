import React from 'react';
import s from './Forecast.module.scss';
import { Tabs } from './Tabs';
import {connect} from 'react-redux';
import {Loader} from '../Loader/Loader'

const Forecast = (props: any) => {
  if (props.loading || !props.weather[props.type]) {
    return (
      <div className={s.days}>
        <Loader />
      </div>
    )
  }

  return (
    <>
      <Tabs />
      <div className={s.days}>
        <pre>{JSON.stringify(props.weather[props.type], null, 2)}</pre>
      </div>
    </>
  );
};


const mapStateToProps = (state:any) => {
  console.log("state in Forecast", state)
  return {
    type: state.locator.type,
    weather: state.locator.weather,
    loading: state.app.loading,
    alert: state.app.alert
  }
}

export default connect(
  mapStateToProps,
  null
)(Forecast)
