import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';

import serialize from 'serialize-javascript';

import App from './../client/App';

export default (req, store) => {
    const content = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.path} context={{}}>
                <App />
            </StaticRouter>
        </Provider>
    );

    return `
            <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <link rel="icon" type="image/png" href="/assets/images/pintxopote-favicon.png">

                    <title>Pintxopote</title>
                
                    <!-- Fonts and icons -->
                    <link rel="stylesheet" type="text/css" href="/assets/icons/material/material-icons.css" />
                    <link rel="stylesheet" href="/assets/icons/font-awesome-4.7.0/css/font-awesome.min.css" />

                    <link rel="stylesheet" href="/assets/css/animate.css" />
                
                    <link rel="stylesheet" href="/assets/css/material-kit.css">
                    <link rel="stylesheet" href="/assets/css/ReactToastify.min.css">

                    <link rel="stylesheet" href="/assets/css/styles.css">
                </head>
                <body>
                    <div id="root">${content}</div>

                    <script src="/assets/js/core/jquery.min.js"></script>
                    <script src="/assets/js/core/popper.min.js"></script>
                    <script src="/assets/js/core/bootstrap-material-design.min.js"></script>
                    <script src="/assets/js/material-kit.min.js"></script>
                    
                    <script>
                        window.INITIAL_STATE = ${serialize(store.getState())}
                    </script>
                    <script src="/bundle.js"></script>
                </body>
            </html>
        `;
};
