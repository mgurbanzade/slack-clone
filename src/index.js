import App from './components/App';
import gon from 'gon';

App(gon);

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
