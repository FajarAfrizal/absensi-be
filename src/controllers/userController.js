const httpRes = require('../helpers/httpRes');
const flaverr = require('flaverr');

const { User } = require('../models');

const FindAll = async (req, res, next) => {
    try {
        const user = await User.findAll();

        if (!user) {
            throw flaverr('E_NOT_FOUND', Error('User not found'))
        }

        return httpRes(res, 200, user)
    } catch (err) {
        return next(err)
    }
}

const FindById = async (req, res, next) => {
    try {
        const userId = req.params.id;

        const user = await User.findById(userId);

        if (!user) {
            throw flaverr('E_NOT_FOUND', new Error('User not found'));
        }

        return httpRes(res, 200, user);
    } catch (err) {

    }
}

const Create = async (req, res, next) => {
    try {
        const { email, username, role, password } = req.body;

        const newUser = await User.create({ email, username, role, password });

        if (!newUser) {
            throw flaverr('E_CREATE_FAILED', new Error('Failed to create user'));
        }

        return httpRes(res, 201);
    } catch (err) {
        return next(err);
    }
}

const Update = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const { username, role, email } = req.body;
        const user = await User.findById(userId);

        if (!user) {
            throw flaverr('E_NOT_FOUND', new Error('User not found'));
        }

        await user.update({ username, role, email });

        return httpRes(res, 200);
    } catch (err) {
        return next(err);
    }
}

const Delete = async (req, res, next) => {
    try {
        const userId = req.params.id;

        const user = await User.findByPk(userId);

        if (!user) {
            throw flaverr('E_NOT_FOUND', new Error('User not found'));
        }

        await user.destroy();

        return httpRes(res, 200);
    } catch (err) {
        return next(err);
    }
}

module.exports = {
    FindAll,
    FindById,
    Create,
    Update,
    Delete
}