import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import logic from './../../../logic/';

import { fetchUser, logout } from './../../redux/actions/user';

class Navbar extends Component {
    static defaultProps = {
        title: 'Pintxopote App'
    };

    static propTypes = {
        title: PropTypes.string
    };

    componentDidMount() {
        if (logic.isLogged()) {
            this.props.fetchUser();
        }
    }

    handleLogout = e => {
        e.preventDefault();

        this.props.logout(this.props.history);
    };

    renderNavbarAuth = () => {
        const {
            location: { pathname },
            auth: { auth, error, user }
        } = this.props;

        if (auth) {
            return (
                <li className="nav-item dropdown">
                    <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="navbarDropdownMenuLink"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        {user.name} {user.surname}
                    </a>
                    <div
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdownMenuLink"
                    >
                        <Link to="/perfil" className="dropdown-item">
                            Perfil
                        </Link>
                        <a
                            href="#"
                            onClick={this.handleLogout}
                            className="dropdown-item"
                        >
                            Logout
                        </a>
                    </div>
                </li>
            );
        } else {
            return (
                <li
                    className={`nav-item ${
                        pathname === '/login' ? 'active' : ''
                    }`}
                >
                    <Link to="/login" className="nav-link">
                        Login
                    </Link>
                </li>
            );
        }
    };

    render() {
        const {
            title,
            location: { pathname },
            auth: { auth }
        } = this.props;

        return (
            <nav className="navbar sticky-top navbar-expand-lg bg-rose">
                <div className="container">
                    <div className="navbar-translate">
                        <Link to="/" className="navbar-brand">
                            <span className="font-weight-bold">{title}</span>
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon" />
                            <span className="navbar-toggler-icon" />
                            <span className="navbar-toggler-icon" />
                        </button>
                    </div>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ml-auto">
                            <li
                                className={`nav-item ${
                                    pathname === '/' ? 'active' : ''
                                }`}
                            >
                                <Link to="/" className="nav-link">
                                    Home
                                </Link>
                            </li>
                            <li
                                className={`nav-item ${
                                    pathname === '/pubs' ? 'active' : ''
                                }`}
                            >
                                <Link to="/pubs" className="nav-link">
                                    Pubs
                                </Link>
                            </li>
                            {auth && (
                                <li
                                    className={`nav-item ${
                                        pathname === '/reservas' ? 'active' : ''
                                    }`}
                                >
                                    <Link to="/reservas" className="nav-link">
                                        Reservas
                                    </Link>
                                </li>
                            )}

                            {this.renderNavbarAuth()}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default withRouter(
    connect(
        mapStateToProps,
        { fetchUser, logout }
    )(Navbar)
);
