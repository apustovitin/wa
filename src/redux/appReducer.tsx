import {SHOW_LOADER, HIDE_LOADER} from './types'

const initialState: any = {
  loading: false
}

export const appReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case SHOW_LOADER:
      return {...state, loading: true}
    case HIDE_LOADER:
      return {...state, loading: false}
    default: return state
  }
}
