import React from 'react';
// import { GlobalSvgSelector } from '../../../../assets/icons/global/GlobalSvgSelector';
import s from './Current.module.scss';
import {connect, ConnectedProps} from 'react-redux';
import type { InitialState } from '../../../../redux/locatorReducer'

type Props = InitialState & {} & {}

const Current = (props: any) => {
  return (
    <div className={s.this__day}>
      <div className={s.top__block}>
        <div className={s.top__block_wrapper}>
          <div className={s.this__temp}>20°</div>
          <div className={s.this__day_name}>Сегодня</div>
        </div>
      </div>
      <div className={s.bottom__block}>
        <div className={s.this__time}>
          Время: <span>21:54</span>
        </div>
        <div className={s.this__city}>
          Населенный пункт: <span>{props.location_name}</span>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state:any) => {
  console.log("state", state)
  return {
    location_name: state.locator.location_name
  }
}

export default connect(
  mapStateToProps,
  null
)(Current)
