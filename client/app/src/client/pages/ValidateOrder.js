import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';

import { validateOrder } from './../redux/actions/order';

class ValidateOrderPage extends Component {
    static propTypes = {
        validate: Proptypes.object.isRequired
    };

    componentDidMount() {
        const { id: orderId } = this.props.match.params;

        this.props.validateOrder(orderId);
    }

    renderMessage = () => {
        const { validate } = this.props;

        const { validate: state, msg } = this.props.validate;

        if (msg === '') return <span>Loading...</span>;

        return (
            <div
                className={`alert alert-${
                    state ? 'success' : 'danger'
                } font-weight-bold`}
            >
                {msg}
            </div>
        );
    };

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xs-12 col-md-6">
                        <h2 className="title">
                            Validar Reserva {this.props.match.params.id}
                        </h2>
                        <hr />
                    </div>

                    <div className="col-xs-12 col-md6">
                        {this.renderMessage()}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ validate }) {
    console.log('STATE TO PROPS', validate);

    return { validate };
}

export default connect(
    mapStateToProps,
    { validateOrder }
)(ValidateOrderPage);
