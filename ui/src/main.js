import React from 'react';
import document from 'global/document';
import {Provider} from 'react-redux';
import {hashHistory, Router, Route} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {render} from 'react-dom';
import store from './store';
import App from './containers/app';

const history = syncHistoryWithStore(hashHistory, store);

const Root = () => (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App} />
        </Router>
    </Provider>
);

render(<Root />, document.body.appendChild(document.createElement('div')));
