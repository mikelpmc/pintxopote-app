import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes, { func } from 'prop-types';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { Field, reduxForm } from 'redux-form';
import { required, minValue } from './../../utils/formValidations';
import { renderField } from './../../utils/renderField';

const minValue1 = minValue(1);

import { toggleModal } from './../../redux/actions/modal';
import { createOrder } from './../../redux/actions/order';

class OrderModal extends Component {
    static defaultProps = {
        title: 'Reservar Pintxo',
        buttonLabel: 'Reservar'
    };

    static propTypes = {
        title: PropTypes.string,
        buttonLabel: PropTypes.string,
        modal: PropTypes.object.isRequired,
        toggleModal: PropTypes.func.isRequired,
        createOrder: PropTypes.func.isRequired
    };

    toggle = () => {
        this.props.toggleModal('');
    };

    onSubmit = ({ quantity }) => {
        const {
            modal: { id },
            auth: { user }
        } = this.props;

        user.creditCard
            ? this.props.createOrder(id, quantity)
            : this.props.history.push(
                  `/perfil?ref=reserva&id=${id}&error=tarjeta`
              );
    };

    render() {
        const { modal, handleSubmit } = this.props;

        return (
            <Modal
                isOpen={modal.isOpen}
                toggle={this.toggle}
                className={this.props.className}
            >
                <ModalHeader toggle={this.toggle}>
                    {this.props.title}
                </ModalHeader>

                <form className="form" onSubmit={handleSubmit(this.onSubmit)}>
                    <ModalBody>
                        <Field
                            label="Cantidad"
                            icon="shopping_cart"
                            name="quantity"
                            type="number"
                            placeholder="Introduce la cantidad"
                            component={renderField}
                            validate={[required, minValue1]}
                        />
                    </ModalBody>

                    <ModalFooter>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="btn btn-rose btn-round"
                            >
                                {this.props.buttonLabel}
                            </button>
                        </div>

                        <button
                            className="btn btn-secondary btn-round"
                            onClick={this.toggle}
                        >
                            Cancelar
                        </button>
                    </ModalFooter>
                </form>
            </Modal>
        );
    }
}

function mapStateToProps({ modal, orders, auth }) {
    return { modal, orders, auth };
}

export default reduxForm({
    form: 'orderForm'
    // enableReinitialize: true
})(
    withRouter(
        connect(
            mapStateToProps,
            { toggleModal, createOrder }
        )(OrderModal)
    )
);
