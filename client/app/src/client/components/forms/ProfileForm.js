import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { required, email } from './../../utils/formValidations';

import { updateUser } from './../../redux/actions/user';

import { renderField } from './../../utils/renderField';

let isInitialized = false;

class ProfileForm extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired
    };

    componentDidMount() {
        const { user } = this.props.auth;

        if (Object.keys(user).length) {
            this.handleInitialize();
        }
    }

    componentDidUpdate() {
        if (!isInitialized) this.handleInitialize();
    }

    // Initialize redux form data
    handleInitialize() {
        const { user } = this.props.auth;

        isInitialized = true;

        let initData = {
            name: user.name,
            surname: user.surname,
            email: user.email,
            password: user.password,
            creditCard: user.creditCard
        };

        if (user.hasOwnProperty('address') && user.address.street !== '') {
            const { address } = this.props.auth.user;

            initData = {
                ...initData,
                street: address.street,
                city: address.city,
                postalCode: address.postalCode,
                country: address.country
            };
        }

        this.props.initialize(initData);
    }

    onSubmit = ({
        name,
        surname,
        email,
        street,
        city,
        postalCode,
        country,
        creditCard
    }) => {
        const { search } = this.props.location;
        const params = new URLSearchParams(search);

        const ref = params.get('ref') ? params.get('ref') : '';
        const pintxoId = params.get('id') ? params.get('id') : '';

        this.props.updateUser(
            name,
            surname,
            email,
            street,
            city,
            postalCode,
            country,
            creditCard,
            this.props.history,
            ref,
            pintxoId
        );
    };

    render() {
        const { handleSubmit } = this.props;

        return (
            <React.Fragment>
                <form className="form" onSubmit={handleSubmit(this.onSubmit)}>
                    <Field
                        label="Nombre"
                        icon="person"
                        name="name"
                        type="text"
                        placeholder="Introduce tu nombre"
                        component={renderField}
                        validate={[required]}
                    />

                    <Field
                        label="Apellido"
                        icon="person_add"
                        name="surname"
                        type="text"
                        placeholder="Introduce tu apellido"
                        component={renderField}
                        validate={[required]}
                    />

                    <Field
                        label="Email"
                        icon="mail"
                        name="email"
                        type="email"
                        placeholder="Introduce tu email"
                        component={renderField}
                        validate={[required, email]}
                    />

                    <Field
                        label="Calle"
                        icon="person"
                        name="street"
                        type="text"
                        placeholder="Introduce tu calle"
                        component={renderField}
                    />

                    <Field
                        label="Ciudad"
                        icon="person"
                        name="city"
                        type="text"
                        placeholder="Introduce tu ciudad"
                        component={renderField}
                    />

                    <Field
                        label="Código postal"
                        icon="person"
                        name="postalCode"
                        type="text"
                        placeholder="Introduce tu código postal"
                        component={renderField}
                    />

                    <Field
                        label="País"
                        icon="person"
                        name="country"
                        type="text"
                        placeholder="Introduce tu país"
                        component={renderField}
                    />

                    <Field
                        label="Tarjeta de crédito"
                        icon="payment"
                        name="creditCard"
                        type="text"
                        placeholder="Introduce tu tarjeta de crédito"
                        component={renderField}
                    />

                    <div className="text-center">
                        <button
                            type="submit"
                            className="btn btn-rose btn-round"
                        >
                            Editar
                        </button>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default reduxForm({
    form: 'profileForm'
})(
    withRouter(
        connect(
            mapStateToProps,
            { updateUser }
        )(ProfileForm)
    )
);
