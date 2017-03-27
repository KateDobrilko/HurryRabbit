import React, {Component} from 'react';
import validateInput from '../../../../server/shared/validations/signin';
import TextFieldGroup from '../../TextFieldGroup/TextFieldGroup';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import  {userSigninRequest} from '../../../actions/signinActions';
import  {addFlashMessage} from '../../../actions/flashMessages';
import {getCurrentUser} from '../../../actions/userActions';


class SigninForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            identifier: '',
            password: '',
            errors: {},
            isLoading: false

        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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
            const requestBody = {identifier: this.state.identifier, password: this.state.password};
            this.props.userSigninRequest(requestBody).then(
                () => {
                    this.props.addFlashMessage({
                        type: 'success',
                        text: 'You logged in successfully. Welcome!'
                    });
                    this.props.getCurrentUser();
                    this.setState({done: true});
                }
            ).catch((error) => {
                    if (error.response) {
                        this.setState({errors: error.response.data.message.errors, isLoading: false});
                        console.log(this.state.errors);
                    }
                }
            );
        }
    }


    render() {
        const {errors, isLoading, identifier, password} = this.state;

        const form = (<form onSubmit={this.onSubmit}>
            <h1>Log in</h1>
            <div className="form-group">{errors.form &&
            <span className="alert alert-danger col-xs-12">{errors.form}</span>}</div>
            <TextFieldGroup field="identifier" value={identifier} label="Username /Email"
                            onChange={this.onChange}
                            error={errors.identifier}/>
            <TextFieldGroup field="password" value={password} label="Password" type="password"
                            onChange={this.onChange} error={errors.password}/>
            <div className="form-group">
                <button disabled={isLoading} className="btn btn-primary btn-lg">
                    Login
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

SigninForm.propTypes = {
    userSigninRequest: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
    getCurrentUser: React.PropTypes.func.isRequired
};


export default connect(null,
    {userSigninRequest, addFlashMessage, getCurrentUser})(SigninForm);