import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../actions/signinActions';

class NavigationBar extends Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
    }

    logout(e) {
        e.preventDefault();
        this.props.logout();
    }

    render() {

        const {isAuthenticated} = this.props.auth;

        const userLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li>
                    <a href="#" onClick={this.logout}>Logout</a>
                </li>

            </ul>

        );

        const guestLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li>
                    <Link to="/sign-up">Sign Up</Link>
                </li>
                <li>
                    <Link to="/sign-in">Login</Link>
                </li>
            </ul>
        );

        return (
            <nav className="navbar navbar-default">
                <div className="navbar-header">
                    <Link to="/" className="navbar-brand">Hurry Rabbit</Link>
                </div>
                <div id="navbar" className="navbar-collapse collapse">
                    {isAuthenticated ? userLinks : guestLinks}
                </div>
            </nav>
        )
    }
}

NavigationBar.propTypes = {
    auth: React.PropTypes.object.isRequired,
    logout: React.PropTypes.func.isRequired
};


function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export  default connect(mapStateToProps, {logout})(NavigationBar);