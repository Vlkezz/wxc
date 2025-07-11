import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { loginUserStore } from './redux/store';

createRoot(document.getElementById('root')!).render(
 <Provider store={loginUserStore}>
    <BrowserRouter basename="/wxc/">
      <App />
    </BrowserRouter>
  </Provider>
);
