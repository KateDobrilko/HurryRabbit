import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import App from './components/App';
import Greetings from './components/Greetings/Greetings';
import SignupPage from './components/SignupPage/SignupPage';
import SigninPage from './components/SigninPage/SigninPage';
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

if(localStorage.jwtToken)
{
    setAuthorizationToken(localStorage.jwtToken);
    store.dispatch(getCurrentUser());
}

render(
    <Provider store={store}>
        <Router>
            <div className="container">
                <Route path="/" component={App}/>
                <Route exact path="/" component={Greetings}/>
                <Route path="/sign-up" component={SignupPage}/>
                <Route path="/sign-in" component={SigninPage}/>
            </div>
        </Router>
    </Provider>,
    document.getElementById('app'));