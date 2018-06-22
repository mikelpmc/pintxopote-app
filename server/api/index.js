'use strict';

require('dotenv').config();

const { mongoose } = require('models');

const express = require('express');
const {
    userRouter,
    pintxoRouter,
    pubRouter,
    orderRouter
} = require('./routes/');

const cors = require('cors');

const {
    env: { PORT, DB_URL, DB_URL_PROD }
} = process;

mongoose
    .connect(DB_URL_PROD)
    .then(() => {
        const port = PORT || process.argv[2] || 3000;

        const app = express();

        const http = require('http').Server(app);
        const io = require('socket.io')(http);

        app.use(cors());

        app.use('/api', [userRouter, pintxoRouter, pubRouter, orderRouter]);

        app.io = io;

        io.on('connection', client => {
            console.log('Client connected');

            client.on('disconnect', function() {
                console.log('Client disconnected');
            });
        });

        http.listen(port, () => console.log(`server running on port ${port}`));

        // app.listen(port, () => console.log(`server running on port ${port}`));

        process.on('SIGINT', () => {
            console.log('\nstopping server');

            mongoose.connection.close(() => {
                console.log('db connection closed');

                process.exit();
            });
        });
    })
    .catch(console.error);
