import * as UserService from '../services/userService';

export async function getCurrentUser(req, res, next) {
    const {token} = req;

    try {
        var user = await UserService.getUserByToken(token);
    } catch ({message}) {
        return next(
            {
                status: 500,
                message
            }
        )

    }
    return res.json(user);
}


export async function getUserById(req, res, next) {
    const {id} = req.params;
    try {
        var user = await UserService.getUserById(id);
    } catch ({message}) {
        return next(
            {
                status: 500,
                message
            }
        )

    }
    return res.json(user);
}