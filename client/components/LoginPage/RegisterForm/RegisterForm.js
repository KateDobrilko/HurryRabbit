import React, {Component} from 'react';
import {connect} from 'react-redux';
import  {loginTabToggle} from '../../../actions/signinActions';

class RegisterForm extends Component {
    render() {
        return (
            <div className="lc-block">
                <div className="input-group m-b-20">
                    <span className="input-group-addon">
                        <i className="zmdi zmdi-account"></i>
                    </span>
                    <div className="fg-line">
                        <input type="text" className="form-control" placeholder="Username"/>
                    </div>
                </div>

                <div className="input-group m-b-20">
                    <span className="input-group-addon">
                        <i className="zmdi zmdi-male"></i>
                    </span>
                    <div className="fg-line">
                        <input type="password" className="form-control" placeholder="Password"/>
                    </div>
                </div>

                <div className="clearfix"></div>

                <div className="checkbox">
                    <label>
                        <input type="checkbox" value=""/>
                        <i className="input-helper"></i>
                        Keep me signed in
                    </label>
                </div>

                <a href="" className="btn btn-login btn-danger btn-float">
                    <i className="zmdi zmdi-arrow-forward"></i>
                </a>

                <ul className="login-navigation">
                    <li className="bgm-red">Register</li>
                    <li className="bgm-orange">Forgot Password?</li>
                </ul>
            </div>
        );

    }

}

export default connect(null,
    {loginTabToggle})(RegisterForm);