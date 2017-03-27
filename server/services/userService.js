import User from '../models/user';


export async function getUserByToken(token) {
    const {_id} = token;

    try {
        var user = await User.findOne({_id}, {password: 0, timezone: 0});
    } catch (e) {
        throw e;
    }

    return user;
}

export async function getUserById(id) {
    try {
        var user = await User.findOne( { $or : [ { "login" : id }, {"email":id} ] }, {password: 0, timezone: 0});
    } catch (e) {
        throw e;
    }

    return user;
}