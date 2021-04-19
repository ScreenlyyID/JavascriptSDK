import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
import {PersistGate} from 'redux-persist/es/integration/react';
import App from './App';
import {unregister} from './registerServiceWorker';
import {store, persistor, history} from './store';

//let Module = require('./SharpnessGlare.js');
//let pingIt = Module().cwrap('pingIt'); // Call Module as a function

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ConnectedRouter history={history}>
                <App history={history} />
            </ConnectedRouter>
        </PersistGate>
    </Provider>
    , 
    document.getElementById('root')
);
unregister();


//module.exports = pingIt;