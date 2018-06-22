import React from 'react';
import Proptypes from 'prop-types';
import { ToastContainer } from 'react-toastify';

const CustomToastContainer = props => {
    return (
        <ToastContainer
            position={props.position}
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
        />
    );
};

CustomToastContainer.defaultProps = {
    position: 'top-center'
};

export default CustomToastContainer;
