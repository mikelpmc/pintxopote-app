import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import pintxopoteApi from 'api-client';
import logic from './../logic/';

import Routes from './Routes';

import PrivateRoute from './utils/privateRoute';

import Navbar from './components/navbar/Navbar';

class App extends Component {
    initApp = () => {
        pintxopoteApi.token = token => {
            if (typeof token !== 'undefined') {
                if (token === null) sessionStorage.removeItem('token');
                else sessionStorage.setItem('token', token);

                return;
            }

            return sessionStorage.getItem('token');
        };

        logic.userId = userId => {
            if (typeof userId !== 'undefined') {
                if (userId === null) sessionStorage.removeItem('userId');
                else sessionStorage.setItem('userId', userId);

                return;
            }

            return sessionStorage.getItem('userId');
        };

        logic.userRole = userRole => {
            if (typeof userRole !== 'undefined') {
                if (userRole === null) sessionStorage.removeItem('userRole');
                else sessionStorage.setItem('userRole', userRole);

                return;
            }

            return sessionStorage.getItem('userRole');
        };
    };

    render() {
        this.initApp();

        const publicRoutes = Routes.routes.map(route => {
            return (
                <Route
                    path={route.path}
                    component={route.component}
                    exact={route.exact}
                    key={route.id}
                />
            );
        });

        const privateRoutes = Routes.privateRoutes.map(route => {
            return (
                <PrivateRoute
                    path={route.path}
                    component={route.component}
                    key={route.id}
                />
            );
        });

        return (
            <div>
                <Navbar title="Pintxopote!" />

                <Switch>{[...publicRoutes, ...privateRoutes]}</Switch>
            </div>
        );
    }
}

export default withRouter(App);
