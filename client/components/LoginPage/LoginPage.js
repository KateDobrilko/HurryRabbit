import React, {Component} from 'react';
import LoginForm from './LoginForm/LoginForm';
import PasswordResetForm from './PasswordResetForm/PasswordResetForm';
import RegisterForm from './RegisterForm/RegisterForm';

import '../App.scss';
import './LoginPage.scss';

class LoginPage extends Component {
    render() {
        return (
            <div className="login-content">
                <LoginForm toggled={true}/>
                <PasswordResetForm/>
                <RegisterForm/>
            </div>
        );

    }
}
export default LoginPage;
