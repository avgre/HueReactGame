import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const initialState = {
  games: [],
  current: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_GAMES':
      return { ...state, games: action.payload };
    case 'SET_GAMESETTINGS':
      return { ...state, settings: action.payload };
    default:
      return state;
  }
}

const persistedReducer = persistReducer(persistConfig, reducer);

export default () => {
  let store = createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  let persistor = persistStore(store);
  return { store, persistor };
};
