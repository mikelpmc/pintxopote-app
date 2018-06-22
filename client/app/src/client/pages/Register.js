import React, { Component } from 'react';

import { RegisterForm } from './../components/forms/';

class RegisterPage extends Component {
    render() {
        return (
            <div className="container animated fadeIn">
                <div className="row justify-content-center">
                    <div className="col-xs-12 col-sm-10 col-md-10 col-lg-8">
                        <div className="card card-signup p-3">
                            <h2 className="card-title text-center">
                                Registrarse
                            </h2>
                            <div className="card-body">
                                <div className="row justify-content-center">
                                    <div className="col-10">
                                        <RegisterForm />
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

export default RegisterPage;
