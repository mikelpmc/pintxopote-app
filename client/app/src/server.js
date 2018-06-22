// ENTRY POINT SERVER SIDE

import 'babel-polyfill'; // To use async await and more
import express from 'express';

import { matchRoutes } from 'react-router-config';
import Routes from './client/Routes';

import { matchPath } from 'react-router';

import renderer from './helpers/renderer';
import createStore from './helpers/createStore';

const app = express();

app.use(express.static('public'));

app.get('*', (req, res) => {
    const store = createStore();

    let foundPath = null;
    const promises = Routes.routes.map(route => {
        foundPath = matchPath(req.url, {
            path: route.path,
            exact: route.exact,
            strict: false
        });

        if (foundPath) {
            const { params } = foundPath;

            return route.loadData && route.loadData(store, params);
        }
    });

    Promise.all(promises).then(() => {
        res.send(renderer(req, store));
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
