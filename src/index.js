import App from './components/App';

// import faker from 'faker';
// import gon from 'gon';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';
App(window.gon);

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
