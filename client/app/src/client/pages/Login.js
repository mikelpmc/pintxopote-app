import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { LoginForm } from './../components/forms/';

class LoginPage extends Component {
    render() {
        return (
            <div className="container animated fadeIn">
                <div className="row justify-content-center">
                    <div className="col-xs-12 col-sm-10 col-md-10 col-lg-8">
                        <div className="card card-signup p-3">
                            <h2 className="card-title text-center">Login</h2>

                            <div className="card-body">
                                <div className="row justify-content-center">
                                    <div className="col-10">
                                        <LoginForm />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;
