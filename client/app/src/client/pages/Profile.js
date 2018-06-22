import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { toast } from 'react-toastify';
import CustomToastContainer from './../utils/customToastContainer';

import { UserData } from './../components/user/';
import { ProfileForm } from './../components/forms/';

class ProfilePage extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired
    };

    componentDidMount() {
        const { search } = this.props.location;
        const params = new URLSearchParams(search);

        const error = params.get('error') ? params.get('error') : '';

        if (error !== '')
            toast.error(
                `Necesitamos que introduzcas una tarjeta de crédito para poder reservarte los pintxos`
            );
    }

    renderUserContent = () => {
        const {
            auth: { user }
        } = this.props;

        if (Object.keys(user).length)
            return (
                <div className="container animated fadeIn">
                    <CustomToastContainer />

                    <div className="row text-center">
                        <div className="col-md-6 ml-auto mr-auto">
                            <div className="profile">
                                <div className="name">
                                    <h3 className="title">
                                        {user.name} {user.surname}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-profile pb-3">
                        <div className="row">
                            <div className="col-xs-12 col-sm-4 col-md-3 col-lg-3">
                                <ul className="nav nav-pills nav-pills-rose flex-column">
                                    <li className="nav-item">
                                        <a
                                            className="nav-link active"
                                            href="#tab1"
                                            data-toggle="tab"
                                        >
                                            Tus Datos
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link"
                                            href="#tab2"
                                            data-toggle="tab"
                                        >
                                            Editar
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div className="col-xs-12 col-sm-8 col-md-9 col-lg-9">
                                <div className="tab-content">
                                    <div className="tab-pane active" id="tab1">
                                        <UserData user={user} />
                                    </div>

                                    {/* EDIT */}
                                    <div className="tab-pane" id="tab2">
                                        <ProfileForm />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
    };

    render() {
        const {
            auth: { user, error, success }
        } = this.props;

        if (error !== '') toast.error(`¡Error! ${error}`);
        if (success !== '') toast.success(`¡Éxito! ${success}`);

        return (
            <div className="main main-raised mt-5">
                <div className="profile-content mb-5">
                    {this.renderUserContent()}
                </div>
            </div>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(ProfilePage);
