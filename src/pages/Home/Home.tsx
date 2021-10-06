import React from 'react';
import s from './Home.module.scss';
import Locator from './components/Locator/Locator'
import Current from './components/Current/Current'
import {useDispatch} from 'react-redux'
import {fetchWeather} from '../../redux/actions'

const initialLocation = [55.75322, 37.622513];

export const Home = () => {
  const dispatch = useDispatch()
  dispatch(fetchWeather(initialLocation))
  return (
    <main className={s.home}>
      <div className={s.wrapper}>
        <Locator />
        <Current />
      </div>
    </main>
  );
};
