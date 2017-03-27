import React, {Component} from 'react';
import timezones from '../../../data/timezones';
import map from 'lodash/map';
import  classnames from 'classnames';
import validateInput from '../../../../server/shared/validations/signup';
import TextFieldGroup from '../../TextFieldGroup/TextFieldGroup';
import {Redirect} from 'react-router';


class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            timezone: '',
            errors: {},
            isLoading: false,
            done: false,
            invalid: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.checkUserExists = this.checkUserExists.bind(this);
    }


    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    isValid() {
        const {errors, isValid} = validateInput(this.state);
        if (!isValid) {
            this.setState({errors});
        }
        return isValid;
    }


    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true});
            this.props.userSignupRequest(this.state).then(
                () => {
                    this.props.addFlashMessage({
                        type: 'success',
                        text: 'You signed up successfully. Welcome!'
                    });
                    this.setState({done: true});
                }
            ).catch((error) => {
                    if (error.response) {
                        this.setState({errors: error.response.data, isLoading: false});
                    }
                }
            );
        }
    }

    checkUserExists(e) {
        const field = e.target.name;
        const val = e.target.value;
        if (val !== '') {
            this.props.isUserExists(val).then(res => {

                let errors = this.state.errors;
                let invalid;

                if (res.data != null) {
                    if (res.data.user) {
                        errors[field] = `There is user with such ${field}`;
                        invalid = true;
                    }
                } else {
                    errors[field] = '';
                    invalid = false;
                }
                this.setState({errors, invalid})

            });
        }
    }


    render() {
        const {errors} = this.state;
        const options = map(timezones, (val, key) =>
            <option key={val} value={val}>{key}</option>
        );
        const form = (<form onSubmit={this.onSubmit}>
            <h1>Join our community!</h1>

            <TextFieldGroup field="login" value={this.state.login} label="Login" onChange={this.onChange}
                            error={errors.login} checkUserExists={this.checkUserExists}/>
            <TextFieldGroup field="email" value={this.state.email} label="Email" type="email"
                            onChange={this.onChange} error={errors.email} checkUserExists={this.checkUserExists}/>
            <TextFieldGroup field="password" value={this.state.password} label="Password" type="password"
                            onChange={this.onChange}
                            error={errors.password}/>
            <TextFieldGroup field="passwordConfirmation" value={this.state.passwordConfirmation}
                            label="Confirm password" type="password" onChange={this.onChange}
                            error={errors.password}/>
            <div className={classnames("form-group", {'has-error': errors.timezone})}>
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
                {errors.timezone && <span className="help-block">{errors.timezone}</span>}
            </div>
            <div className="form-group">
                <button disabled={this.state.isLoading || this.state.invalid} className="btn btn-primary btn-lg">
                    Sign up
                </button>
            </div>
        </form>);
        return (
            <div>
                {this.state.done ? <Redirect to="/"/> : form}
            </div>
        )
    };
}

SignupForm.propTypes = {
    userSignupRequest: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
    isUserExists: React.PropTypes.func.isRequired
};


export default SignupForm;