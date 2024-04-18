import express from "express";
import User from "../models/User";
import {Error} from 'mongoose';

const usersRouter = express.Router();
usersRouter.post('/', async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        if (username === undefined || (/^\s*$/.test(username)) ||
            password === undefined || (/^\s*$/.test(password))) {
            return res.status(400).json({"error": "Fields must be present in the request"});
        }

        const user = new User({
            username,
            password
        });

        user.generateToken();
        await user.save();

        return res.send(user);

    } catch (error) {
        if (error instanceof Error.ValidationError) {
            return res.status(400).send(error);
        }
        return next(error);
    }
});

usersRouter.post('/sessions', async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        if (username === undefined || (/^\s*$/.test(username)) ||
            password === undefined || (/^\s*$/.test(password))) {
            return res.status(400).json({"error": "Fields must be present in the request"});
        }
        const user = await User.findOne({username});

        if (!user) {
            return res.status(400).send({error: 'Username not found'});
        }
        const isMatch = await user.checkPassword(password);

        if (!isMatch) {
            return res.status(400).send({error: 'Password is wrong'});
        }

        user.generateToken();
        await user.save();

        return res.send({message: 'Username and password correct!', user});
    } catch (e) {
        next(e);
    }
});


export default usersRouter;