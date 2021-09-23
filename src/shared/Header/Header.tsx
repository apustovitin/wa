import React from 'react';
import s from './Header.module.scss';
import {ReactComponent as HeaderLogo} from '../../asserts/icons/icons8-weather.svg';
import {ReactComponent as ChangeTheme} from '../../asserts/icons/change_theme.svg';
import Select from 'react-select';

interface Props {}

export const Header = (Props : any) => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ];
  const colourStyles = {
    control: (styles: any) => ({
      ...styles,
      backgroundColor: '#4793FF34',
      width: '194px',
      heigth: '37px',
      border: 'none',
      borderRadius: '10px',
      zIndex: 100
    }),
  };
  return (
    <header className={s.header}>
      <div className={s.logo_wrapper}>
        <div className={s.logo}>
          <HeaderLogo className={s.logo_svg}/>
        </div>
        <div className={s.title}>Weather app</div>
      </div>
      <div className={s.selector_wrapper}>
        <div className={s.change_theme}>
          <ChangeTheme />
        </div>
        <div className={s.selector}>
          <Select styles={colourStyles} options={options} />
        </div>
      </div>
    </header>
  );
};
