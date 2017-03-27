import User from '../models/user';
import jwt from 'jsonwebtoken';
import config from '../config';

import isEmpty from 'lodash/isEmpty';
import Validator from 'validator';


function validateInput(data) {
    let errors = {};
    console.log(data);
    if (Validator.isEmpty(data.login)) {
        errors.login = 'This field is required';
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = 'This field is required';
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'This field is required';
    }
    if (Validator.isEmpty(data.passwordConfirmation)) {
        errors.passwordConfirmation = 'This field is required';
    }
    if (!Validator.equals(data.password, data.passwordConfirmation)) {
        errors.passwordConfirmation = 'Passwords must match';
    }
    if (Validator.isEmpty(data.timezone)) {
        errors.timezone = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

export const signup = async(req, res, next) => {
    const credentials = req.body;
    let user;


    const {errors, isValid} = validateInput(credentials);
    console.log(errors);

    if (!isValid) {
        res.status(400).json(errors);
    }

    try {
        user = await User.create(credentials);
    } catch ({message}) {
        return next({
            status: 400,
            message
        });
    }

    res.json(user)
};

export const signin = async(req, res, next) => {
    const {login, password} = req.body;

    const user = await User.findOne({login});

    if (!user) {
        return next({
            status: 400,
            message: 'User not found'
        })
    }

    try {
        const result = await  user.comparePasswords(password);
    } catch (e) {
        return next({
            status: 400,
            message: 'Bad credentials'
        });
    }

    req.session.userId = user._id;
    const token = jwt.sign({_id: user._id}, config.secret);
    res.json({token});
};