import React from 'react';
import HouseNavigator from './Navigation/HouseNavigator';
import Loading from './store/Reducers/Loading';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

const rootReducer = combineReducers({
  loading: Loading,
});

const store = createStore(rootReducer);

const App = () => {
  return (
    <Provider store={store}>
      <HouseNavigator />
    </Provider>

  );
};

export default App;