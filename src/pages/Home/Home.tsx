import React from 'react';
import s from './Home.module.scss';
import {Locator} from './components/Locator/Locator'
import Current from './components/Current/Current'
import Forecast from './components/Forecasts/Forecast'

export const Home = () => {
  return (
    <main className={s.home}>
      <div className={s.wrapper}>
        <Locator />
        <Current />
      </div>
      <Forecast />
    </main>
  );
};
