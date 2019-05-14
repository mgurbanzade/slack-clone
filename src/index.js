import React from 'react';
import ReactDOM from 'react-dom';
import gon from 'gon';
import cookies from 'js-cookie';
import faker from 'faker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import App from './components/App';
import runSockets from './utils/sockets';
import CurrentUserContext from './utils/context';
import initializeState from './utils/initialState';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const middleware = [
  applyMiddleware(thunk),
  ...(window.__REDUX_DEVTOOLS_EXTENSION__ ? [window.__REDUX_DEVTOOLS_EXTENSION__()] : []),
];

const store = createStore(
  reducers,
  initializeState(gon),
  compose(...middleware),
);

runSockets(store);

if (!cookies.get('currentUser')) {
  cookies.set('currentUser', faker.name.findName(), { expires: 1 });
}

ReactDOM.render(
  <Provider store={store}>
    <CurrentUserContext.Provider value={cookies.get('currentUser')}>
      <App />
    </CurrentUserContext.Provider>
  </Provider>,
  document.getElementById('chat'),
);
