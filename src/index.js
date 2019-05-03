import gon from 'gon';
import App from './components/App';

App(gon);

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
