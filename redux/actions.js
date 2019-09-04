import { searchSnooth } from '../api'

// action types
export const WINE_SEARCH_STARTED = 'WINE_SEARCH_STARTED'
export const WINE_RESULTS_LOADED = 'WINE_RESULTS_LOADED'
export const ADD_WINE_TO_CELLAR = 'ADD_WINE_TO_CELLAR'
export const REMOVE_WINE_FROM_CELLAR = 'REMOVE_WINE_FROM_CELLAR'

// action creators
export const addWineToCellar = newWine => ({
  type: ADD_WINE_TO_CELLAR,
  payload: newWine,
})

export const removeWineFromCellar = myWine => ({
  type: REMOVE_WINE_FROM_CELLAR,
  payload: myWine,
})


// async action creators
export const searchWine = query => async dispatch => {
  dispatch({type: WINE_SEARCH_STARTED})
  const wines = await searchSnooth(query)
  dispatch({type: WINE_RESULTS_LOADED, payload: wines})  
}