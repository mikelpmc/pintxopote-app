const express = require('express');
const bodyParser = require('body-parser');

const logic = require('logic');

const jwt = require('jsonwebtoken');
const jwtValidation = require('./utils/jwt-validation');

const pubRouter = express.Router();

const {
    env: { TOKEN_SECRET, TOKEN_EXP }
} = process;

const jwtValidator = jwtValidation(TOKEN_SECRET);

const jsonBodyParser = bodyParser.json();

// LIST PUBS BY CITY (Query string)
pubRouter.get('/pubs', (req, res) => {
    const {
        query: { city }
    } = req;

    logic
        .listPubsByCity({ city })
        .then(pubs => {
            res.status(200).json({ status: 'OK', data: pubs });
        })
        .catch(({ message }) => {
            res.status(400).json({ status: 'KO', error: message });
        });
});

// GET PUB BY ID
pubRouter.get('/pubs/:pubId', (req, res) => {
    const {
        params: { pubId }
    } = req;

    logic
        .getPubById({ id: pubId })
        .then(pub => {
            res.status(200).json({ status: 'OK', data: pub });
        })
        .catch(({ message }) => {
            res.status(400).json({ status: 'KO', error: message });
        });
});

module.exports = pubRouter;
