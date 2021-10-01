import React from 'react';
import s from './Home.module.scss';
import { Locator } from './components/Locator/Locator'

export const Home = () => {
  return (
    <main className={s.home}>
      <Locator />
    </main>
  );
};
