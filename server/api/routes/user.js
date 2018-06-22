const express = require('express');
const bodyParser = require('body-parser');

const logic = require('logic');

const jwt = require('jsonwebtoken');
const jwtValidation = require('./utils/jwt-validation');

const userRouter = express.Router();

const {
    env: { TOKEN_SECRET, TOKEN_EXP }
} = process;

const jwtValidator = jwtValidation(TOKEN_SECRET);

const jsonBodyParser = bodyParser.json();

// REGISTER USER
userRouter.post('/users', jsonBodyParser, (req, res) => {
    const {
        body: { name, surname, email, password, ...rest }
    } = req;

    logic
        .registerUser({ name, surname, email, password, ...rest })
        .then(() => {
            res.status(201);
            res.json({ status: 'OK' });
        })
        .catch(({ message }) => {
            res.status(400);
            res.json({ status: 'KO', error: message });
        });
});

// AUTHENTICATE USER
userRouter.post('/auth', jsonBodyParser, (req, res) => {
    const {
        body: { email, password }
    } = req;

    logic
        .authenticateUser(email, password)
        .then(({ id, role }) => {
            const token = jwt.sign({ id, role }, TOKEN_SECRET, {
                expiresIn: TOKEN_EXP
            });

            res.status(200).json({ status: 'OK', data: { id, role, token } });
        })
        .catch(({ message }) => {
            res.status(400).json({ status: 'KO', error: message });
        });
});

// RETRIEVE USER
userRouter.get('/users/:userId', jwtValidator, (req, res) => {
    const {
        params: { userId }
    } = req;

    return logic
        .retrieveUser(userId)
        .then(user => {
            res.status(200).json({ status: 'OK', data: user });
        })
        .catch(({ message }) => {
            res.status(400).json({ status: 'KO', error: message });
        });
});

// UPDATE USER
userRouter.patch(
    '/users/:userId',
    [jwtValidator, jsonBodyParser],
    (req, res) => {
        const {
            params: { userId },
            body: { name, surname, email, newEmail, ...rest }
        } = req;

        return logic
            .updateUser({
                id: userId,
                name,
                surname,
                email,
                newEmail,
                ...rest
            })
            .then(user => {
                res.status(200).json({ status: 'OK' });
            })
            .catch(({ message }) => {
                res.status(400).json({ status: 'KO', error: message });
            });
    }
);

// SAVE USER ORDER
userRouter.post('/users/orders', [jwtValidator, jsonBodyParser], (req, res) => {
    const {
        body: { orderId, userId }
    } = req;

    logic
        .saveUserOrder({ orderId, userId })
        .then(() => {
            res.status(200).json({ status: 'OK' });
        })
        .catch(({ message }) => {
            res.status(400).json({ status: 'KO', error: message });
        });
});

module.exports = userRouter;
