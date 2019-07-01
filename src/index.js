import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux' // Redux
import { store } from './redux/reduxStore' // Redux
import * as serviceWorker from './serviceWorker';


// i18next
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import common_vi from "./locale/vi/common.json";
import common_en from "./locale/en/common.json";
i18next.init({
  interpolation: { escapeValue: false },
  lng: 'en',
  resources: {
    en: {
      common: common_en
    },
    vi: {
      common: common_vi
    },
  },
});
//// i18next

ReactDOM.render(
    <I18nextProvider i18n={i18next}>
        <Provider store={store}>
            <App />
        </Provider>
    </I18nextProvider>
    , document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
