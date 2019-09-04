import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import reducer from './reducer'

const persistConfig = { //from CS50M example
  key: 'root',
  storage,
  blacklist: ['wineResults'],
}

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = createStore(persistedReducer, applyMiddleware(thunk))
export const persistor = persistStore(store)

//persistor.purge()