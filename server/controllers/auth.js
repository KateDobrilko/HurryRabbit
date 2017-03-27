import User from '../models/user';
import jwt from 'jsonwebtoken';
import config from '../config';
import commonValidations from '../shared/validations/signup';
import Promise from 'bluebird';
import isEmpty from 'lodash/isEmpty';


function validateInput(data, otherValidations) {
    let {errors} = otherValidations(data);
    return Promise.all(
        [
            User.findOne({email: data.email}).then(user => {
                    if (user) {
                        errors.email = "There is user with such email";
                    }
                }
            ),
            User.findOne({login: data.login}).then(user => {
                if (user) {
                    errors.login = "There is user with such login"
                }
            })
        ]
    ).then(() => {
            return {
                errors,
                isValid: isEmpty(errors)
            }
        }
    );

}

export const signup = async(req, res, next) => {
    const credentials = req.body;
    let user;

    const {errors, isValid} = commonValidations(credentials);
    validateInput(req.body, commonValidations).then(({errors, isValid}) => {
            if (isValid) {
                User.create(credentials).catch(({message}) => {
                        return next({
                            status: 400,
                            message
                        });
                    }
                ).then((userResponse) => {
                    user = userResponse;
                    res.json(user)
                })
            }
            else {
                res.status(400).json(errors);
            }
        }
    );
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