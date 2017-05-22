import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import App from './components/App';
import LoginPage from './components/LoginPage/LoginPage';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './rootReducer';
import setAuthorizationToken from './utils/setAuthorizationToken';
import {getCurrentUser, setCurrentUser} from './actions/userActions';

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

if (localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken);
    store.dispatch(getCurrentUser());
}

render(
    <Provider store={store}>
        <Router>
            <div className="container">
                <Route path="/" component={App}/>
                <Route path="/login" component={LoginPage}/>
            </div>
        </Router>
    </Provider>,
    document.getElementById('app'));