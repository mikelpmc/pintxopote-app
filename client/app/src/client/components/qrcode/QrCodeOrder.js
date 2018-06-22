import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';

class QrCodeOrder extends Component {
    static defaultProps = {
        size: 150,
        fgColor: '#000000',
        bgColor: '#ffffff',
        level: 'L',
        renderAs: 'svg'
    };

    static propTypes = {
        value: PropTypes.string.isRequired,
        size: PropTypes.number,
        fgColor: PropTypes.string,
        bgColor: PropTypes.string,
        level: PropTypes.string
    };

    render() {
        return (
            <QRCode
                value={this.props.value}
                size={this.props.size}
                fgColor={this.props.fgColor}
                bgColor={this.props.bgColor}
                level={this.props.level}
                renderAs={this.props.renderAs}
            />
        );
    }
}

export default QrCodeOrder;
