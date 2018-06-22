const express = require('express');
const bodyParser = require('body-parser');

const logic = require('logic');

const jwt = require('jsonwebtoken');
const jwtValidation = require('./utils/jwt-validation');

const permitValidation = require('./utils/permission-validation');

const orderRouter = express.Router();

const {
    env: { TOKEN_SECRET, TOKEN_EXP }
} = process;

const jwtValidator = jwtValidation(TOKEN_SECRET);
const permitValidator = permitValidation(TOKEN_SECRET);

const jsonBodyParser = bodyParser.json();

// CREATE AN ORDER
orderRouter.post('/orders', [jsonBodyParser, jwtValidator], (req, res) => {
    const {
        body: { user, pintxopote, quantity }
    } = req;

    logic
        .createOrder({ user, pintxopote, quantity })
        .then(order => {
            req.app.io.emit('orderCreated', order.pintxopote);

            res.status(201).json({ status: 'OK', data: order });
        })
        .catch(({ message }) => {
            res.status(400);
            res.json({ status: 'KO', error: message });
        });
});

// GET ORDER BY USER ID
orderRouter.get('/orders/:userId', jwtValidator, (req, res) => {
    const {
        params: { userId }
    } = req;

    return logic
        .getOrdersByUserId({ userId })
        .then(orders => {
            res.status(200).json({ status: 'OK', data: orders });
        })
        .catch(({ message }) => {
            res.status(400).json({ status: 'KO', error: message });
        });
});

// VALIDATE ORDER
orderRouter.get(
    '/orders/:orderId/validate',
    [jwtValidator, permitValidator('pub')],
    (req, res) => {
        const {
            params: { orderId }
        } = req;

        return logic
            .validateOrder({ orderId })
            .then(() => {
                res.status(200).json({ status: 'OK' });
            })
            .catch(({ message }) => {
                res.status(400).json({ status: 'KO', error: message });
            });
    }
);

// GET PINTXOPOTE ORDERS BY ID
orderRouter.get('/orders/pintxos/:pintxopoteId', (req, res) => {
    const {
        params: { pintxopoteId }
    } = req;

    return logic
        .getPintxopoteOrdersById({ pintxopoteId })
        .then(orders => {
            res.status(200).json({ status: 'OK', data: orders });
        })
        .catch(({ message }) => {
            res.status(400).json({ status: 'KO', error: message });
        });
});

module.exports = orderRouter;
