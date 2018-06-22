const express = require('express');
const bodyParser = require('body-parser');

const logic = require('logic');

const jwt = require('jsonwebtoken');
const jwtValidation = require('./utils/jwt-validation');

const permitValidation = require('./utils/permission-validation');

const pintxoRouter = express.Router();

const {
    env: { TOKEN_SECRET, TOKEN_EXP }
} = process;

const jwtValidator = jwtValidation(TOKEN_SECRET);
const permitValidator = permitValidation(TOKEN_SECRET);

const jsonBodyParser = bodyParser.json();

// CREATE PINTXOPOTE
pintxoRouter.post(
    '/pintxos/:userId',
    [jwtValidator, permitValidator('pub'), jsonBodyParser],
    (req, res) => {
        const {
            params: { userId },
            body: { name, pub, ...rest }
        } = req;

        logic
            .createPintxopote({
                name,
                pub,
                ...rest
            })
            .then(() => {
                res.status(201).json({ status: 'OK' });
            })
            .catch(({ message }) => {
                res.status(400).json({ status: 'KO', error: message });
            });
    }
);

// LIST PINTXOPOTES BY CITY
pintxoRouter.get('/pintxos', (req, res) => {
    const {
        query: { city }
    } = req;

    logic
        .listPintxopotesByCity({ city })
        .then(pintxopotes => {
            res.status(200).json({ status: 'OK', data: pintxopotes });
        })
        .catch(({ message }) => {
            res.status(400).json({ status: 'KO', error: message });
        });
});

// GET PINTXOPOTE BY ID
pintxoRouter.get('/pintxos/:pintxopoteId', (req, res) => {
    const {
        params: { pintxopoteId }
    } = req;

    logic
        .getPintxopoteById({ id: pintxopoteId })
        .then(pintxopote => {
            res.status(200).json({ status: 'OK', data: pintxopote });
        })
        .catch(({ message }) => {
            res.status(400).json({ status: 'KO', error: message });
        });
});

module.exports = pintxoRouter;
