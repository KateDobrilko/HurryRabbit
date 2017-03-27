import React, {Component} from 'react';
import timezones from '../../../data/timezones';
import map from 'lodash/map';

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            timezone: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }


    onSubmit(e) {
        e.preventDefault();
        this.props.userSignupRequest(this.state);
        /*axios.post('/api/users', {user: this.state});
        console.log(this.state);*/
    }


    render() {
        const options = map(timezones, (val, key) =>
            <option key={val} value={val}>{key}</option>
        );
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Join our community!</h1>
                <div className="form-group">
                    <label className="control-label">
                        Username
                    </label>
                    <input value={this.state.username}
                           onChange={this.onChange}
                           className="form-control"
                           type="text" name="username"/>
                </div>
                <div className="form-group">
                    <label className="control-label">
                        Email
                    </label>
                    <input value={this.state.email}
                           onChange={this.onChange}
                           className="form-control"
                           type="email" name="email"/>
                </div>
                <div className="form-group">
                    <label className="control-label">
                        Password
                    </label>
                    <input value={this.state.password}
                           onChange={this.onChange}
                           className="form-control"
                           type="password" name="password"/>
                </div>
                <div className="form-group">
                    <label className="control-label">
                        Password Confirmation
                    </label>
                    <input value={this.state.passwordConfirmation}
                           onChange={this.onChange}
                           className="form-control"
                           type="password" name="passwordConfirmation"/>
                </div>
                <div className="form-group">
                    <label className="control-label">
                        Timezone
                    </label>
                    <select value={this.state.timezone}
                            onChange={this.onChange}
                            className="form-control"
                            name="timezone">
                        <option value="" disabled>Choose Your Timezone</option>
                        {options}
                    </select>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary btn-lg">
                        Sign up
                    </button>
                </div>
            </form>
        )
    };
}

SignupForm.propTypes = {
    userSignupRequest: React.PropTypes.func.isRequired
};

export default SignupForm;