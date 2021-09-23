import React from 'react';
import s from './Home.module.scss';
import { Locator } from './components/locator/Locator'
interface Props {}

export const Home = (Props : any) => {
  return (
    <main className={s.home}>
      <Locator />
    </main>
  );
};
