const express = require('express');
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');
require("dotenv").config();
const { createUser, getUser } = require('../db');

//import everything our router relies on^^^

//POST/api/users/login
usersRouter.post('/login', async (req, res, next) =>{
    const { username, password } = req.body;
    //^^req.body = data recieved in/from front-end request.

    if(!username || !password){
        //"next"= another response, a callback or "fallback",
        //typically in absence of expected data. could be anything.
        next({
            name: 'LoginFail',
            message: 'Enter Valid Username and Password.'
        });
    }

    try {
        const user = await getUser({username, password});
        if(user){
            const token = jwt.sign({
                id: user.id,
                username: user.username,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1w",
            }
            );
            res.send({
                message: "Login Success!",
                'token': token
            });
        }else{
            next({
                name: "LoginFail",
                message: "Enter Valid Username and Password."
            })
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
});

// POST /api/users/register
usersRouter.post('/register', async (req, res, next) =>{
    try {
        const { username, password } = req.body;
        //if user already exists == login;
        const existingUser = await getUser({ username, password });
        if (existingUser){
            next({
                name: 'ExistingUser',
                message: "Re-Routing.."
            });
            // res.send(existingUser);
            // and can each route only have one res.send?
        }else if (password.length < 10 ){
            next({
                name: 'PasswordLengthError',
                message: "Password Too Weak"
            });
        }else {
            const user = await createUser({username, password});
            res.send({user})
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
});

module.exports = usersRouter;