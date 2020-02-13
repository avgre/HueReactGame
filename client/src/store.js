import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const initialState = {
  hubIp: '192.168.8.2',
  hubUsername: '',
  gameName: '',
  color:'',
  globalOptions: {
      players: 2,
      sound: 'on',
  },
  currentColor: 'red',
  games: {
      redlight: {
          settings: {
              time: 2, 
          }
      },
      floorislava: {
          settings: {
              time: 6,
          }
      },
      musicalchairs: {
          settings: {
              time: 8,
          }
      },
  }
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'INITIALIZE_GAME':
      return { ...state, gameName: action.payload };
    case 'CHANGE_COLOR':
      return { ...state, color: action.payload };
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
