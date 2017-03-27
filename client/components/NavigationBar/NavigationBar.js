import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default () => {
    return (
        <nav className="navbar navbar-default">
            <div className="navbar-header">
                <Link to="/" className="navbar-brand">Hurry Rabbit</Link>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <Link to="/sign-up">Sign Up</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}