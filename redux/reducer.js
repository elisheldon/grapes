import {combineReducers} from 'redux'

import { WINE_SEARCH_STARTED, WINE_RESULTS_LOADED, ADD_WINE_TO_CELLAR, REMOVE_WINE_FROM_CELLAR } from './actions'

const wineResultsReducer = (state = [], action) => {
  if (action.type === WINE_SEARCH_STARTED) return 'loading'
  else if (action.type === WINE_RESULTS_LOADED) return action.payload
  return state
}

const cellarReducer = (state = [], action) => {
  if (action.type === ADD_WINE_TO_CELLAR){
    return [...state, action.payload]
  }
  else if (action.type === REMOVE_WINE_FROM_CELLAR){
    return state.filter(function( wine ) {
      return wine.code !== action.payload.code
    })
  }
  return state
}

const reducer = combineReducers({
  wineResults: wineResultsReducer,
  cellar: cellarReducer,
})

export default reducer