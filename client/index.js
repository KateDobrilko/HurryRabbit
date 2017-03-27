import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import App from './components/App';
import Greetings from './components/Greetings/Greetings';
import SignupPage from './components/SignupPage/SignupPage';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';


const store = createStore(
    (state = {}) => state,
    applyMiddleware(thunk)
);

render(
    <Provider store={store}>
        <Router>
            <div className="container">
                <Route path="/" component={App}/>
                <Route exact path="/" component={Greetings}/>
                <Route path="/sign-up" component={SignupPage}/>
            </div>
        </Router>
    </Provider>,
    document.getElementById('app'));