import { combineReducers, applyMiddleware } from 'redux';
import charactersReducer from '../reducer/Reducer';
import { configureStore } from "@reduxjs/toolkit"

const rootReducer = combineReducers({
  characters: charactersReducer,
});

const store = configureStore({
  reducer: rootReducer, 
})

export default store;