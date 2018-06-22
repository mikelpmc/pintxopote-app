import React from 'react';

export const renderField = field => {
    const {
        meta: { touched, error }
    } = field;

    return (
        <div className="form-group">
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">
                        <i className="material-icons">{field.icon}</i>
                    </span>
                </div>

                <input
                    type={field.type}
                    className="form-control"
                    placeholder={field.placeholder}
                    {...field.input}
                />
            </div>

            <div className="form-text text-danger mt-2 text-right">
                {touched && (error && <p>{error}</p>)}
            </div>
        </div>
    );
};
