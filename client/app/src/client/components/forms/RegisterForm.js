import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { toast } from 'react-toastify';
import CustomToastContainer from './../../utils/customToastContainer';

import { registerUser } from './../../redux/actions/user';

import { required, email, minLength } from './../../utils/formValidations';
const minLength3 = minLength(3);

import { renderField } from './../../utils/renderField';

class RegisterForm extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func.isRequired
    };

    onSubmit = ({ name, surname, email, password }) => {
        const { history } = this.props;

        this.props.registerUser(name, surname, email, password, history);
    };

    render() {
        const {
            handleSubmit,
            auth: { error }
        } = this.props;

        if (error !== '') toast.error(`Error! ${error}`);

        return (
            <React.Fragment>
                <form className="form" onSubmit={handleSubmit(this.onSubmit)}>
                    <Field
                        label="Name"
                        icon="person"
                        name="name"
                        type="text"
                        placeholder="Nombre..."
                        component={renderField}
                        validate={[required]}
                    />

                    <Field
                        label="Apellido"
                        icon="person_add"
                        name="surname"
                        type="text"
                        placeholder="Apellido..."
                        component={renderField}
                        validate={[required]}
                    />

                    <Field
                        label="Email"
                        icon="mail"
                        name="email"
                        type="email"
                        placeholder="Email..."
                        component={renderField}
                        validate={[required, email]}
                    />

                    <Field
                        label="Contraseña"
                        icon="lock_outline"
                        name="password"
                        type="password"
                        placeholder="Contraseña..."
                        component={renderField}
                        validate={[required, minLength3]}
                    />

                    <Field
                        label="Repetir Contraseña"
                        icon="lock_outline"
                        name="password_repeat"
                        type="password"
                        placeholder="Repetir contraseña..."
                        component={renderField}
                        validate={[required, minLength3]}
                    />

                    <div className="text-center">
                        <button
                            type="submit"
                            className="btn btn-rose btn-round"
                        >
                            Registrarse
                        </button>
                    </div>

                    <span className="float-right">
                        <Link to="/login">¿Ya estás registrado?</Link>
                    </span>
                </form>

                <CustomToastContainer />
            </React.Fragment>
        );
    }
}

function validate(values) {
    const errors = {};

    if (values.password_repeat !== values.password) {
        errors.password_repeat = 'Las contraseñas no coinciden';
    }

    return errors;
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default reduxForm({
    validate,
    form: 'registerForm'
})(
    withRouter(
        connect(
            mapStateToProps,
            { registerUser }
        )(RegisterForm)
    )
);
