import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import logic from './../../logic/';

class PrivateRoute extends Component {
    state = {
        isChecking: true,
        isAuth: false
    };

    componentDidMount() {
        this.setState({
            isAuth: logic.isLogged(),
            isChecking: false
        });
    }

    render() {
        const { isAuth, isChecking } = this.state;

        const { component: Component, ...rest } = this.props;

        return !isChecking ? (
            <Route
                {...rest}
                render={props =>
                    isAuth ? (
                        <Component {...props} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: { from: props.location }
                            }}
                        />
                    )
                }
            />
        ) : null;
    }
}

export default PrivateRoute;
