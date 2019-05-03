import App from './components/App';

// import faker from 'faker';
import gon from 'gon';
// import cookies from 'js-cookie';

App(gon);

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
