import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import App from './components/App';
import Greetings from './components/Greetings/Greetings';
import SignupPage from './components/SignupPage/SignupPage';

render(
    <Router>
        <div className="container">
            <Route path="/" component={App}/>
            <Route exact path="/"  component={Greetings}/>
            <Route path="/sign-up" component={SignupPage}/>
        </div>
    </Router>,
    document.getElementById('app'));