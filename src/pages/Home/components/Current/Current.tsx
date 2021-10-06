import React from 'react';
// import { GlobalSvgSelector } from '../../../../assets/icons/global/GlobalSvgSelector';
import s from './Current.module.scss';
import {connect} from 'react-redux';
import {Loader} from '../Loader/Loader'


const Current = (props: any) => {
  if (props.loading) {
    return (
      <div className={s.this__day}>
        <Loader />
      </div>
    )
  }
  return (
    <div className={s.this__day}>
      <div className={s.top__block}>
        <div className={s.top__block_wrapper}>
          <div className={s.this__temp}>{props.weather.current.temp}</div>
          <div className={s.this__day_name}>Сегодня</div>
        </div>
      </div>
      <div className={s.bottom__block}>
        <div className={s.this__time}>
          Время: <span>21:54</span>
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
    loading: state.app.loading
  }
}

export default connect(
  mapStateToProps,
  null
)(Current)
