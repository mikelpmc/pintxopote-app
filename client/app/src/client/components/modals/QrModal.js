import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes, { func } from 'prop-types';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import QrCodeOrder from './../qrcode/QrCodeOrder';

import { toggleModal } from './../../redux/actions/modal';

class OrderModal extends Component {
    static defaultProps = {
        title: 'QR Reserva'
    };

    static propTypes = {
        title: PropTypes.string,
        modal: PropTypes.object.isRequired,
        toggleModal: PropTypes.func.isRequired
    };

    toggle = () => {
        this.props.toggleModal('');
    };

    render() {
        const { modal } = this.props;

        return (
            <Modal
                isOpen={modal.isOpen}
                toggle={this.toggle}
                className={this.props.className}
            >
                <ModalHeader toggle={this.toggle}>
                    {this.props.title} - {modal.id}
                </ModalHeader>

                <ModalBody>
                    <p>
                        Enseña este código QR en el pub para validar tu reserva
                        y recibir tus pintxos!
                    </p>

                    <div className="row justify-content-center">
                        <div className="col-xs-12 col-sm-6 text-center">
                            <QrCodeOrder
                                value={`localhost:3000/validate/order/${
                                    modal.id
                                }`}
                            />
                        </div>
                    </div>
                </ModalBody>

                <ModalFooter>
                    <button
                        className="btn btn-secondary btn-round"
                        onClick={this.toggle}
                    >
                        Cerrar
                    </button>
                </ModalFooter>
            </Modal>
        );
    }
}

function mapStateToProps({ modal, orders, auth }) {
    return { modal, orders, auth };
}

export default withRouter(
    connect(
        mapStateToProps,
        { toggleModal }
    )(OrderModal)
);
