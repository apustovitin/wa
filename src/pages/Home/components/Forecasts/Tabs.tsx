import React from 'react';
import {useDispatch} from 'react-redux';
import {changeType} from '../../../../redux/actions'
import s from './Forecast.module.scss';


export const Tabs = () => {
  const dispatch = useDispatch()

  return (
    <div className={s.tabs}>
      <div className={s.tabs__wrapper}>
        <div className={s.tab}>
          <button onClick={() => dispatch(changeType('minutely'))}>По минутно</button>
        </div>
        <div className={s.tab}>
          <button onClick={() => dispatch(changeType('hourly'))}>По часам</button>
        </div>
        <div className={s.tab}>
          <button onClick={() => dispatch(changeType('daily'))}>По дням</button>
        </div>
      </div>
    </div>
  );
};
