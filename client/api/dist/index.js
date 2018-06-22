'use strict';

/**
 * pintxopote API (client)
 *
 *
 * @author mikelpmc
 * @version 1.0.0
 */

var axios = require('axios');

var pintxopoteApi = {
    url: 'NO-URL',

    /**
     * Common method to make HTTP requests
     *
     * @param {string} path - The path to the endpoint
     * @param {string} method - The HTTP method (POST, GET, PUT, DELETE)
     * @param {Object} data - The data to be sent (if any)
     * @param {boolean} [withToken] - A flag to indicate if request is subject to token or not
     */
    _call: function _call(_ref) {
        var path = _ref.path,
            method = _ref.method,
            data = _ref.data,
            _ref$withToken = _ref.withToken,
            withToken = _ref$withToken === undefined ? false : _ref$withToken;

        var headers = '';
        if (withToken) headers.authorization = 'bearer ' + this.token();

        var config = {
            method: method,
            url: this.url + '/' + path,
            headers: headers,
            data: data && data
        };

        return axios(config);
    },
    token: function token(_token) {
        if (_token) {
            this._token = _token;

            return;
        }

        return this._token;
    },


    /**
     * Registers a user
     *
     * @async
     *
     * @param {string} username - The choosen new user's username
     * @param {string} password - The choosen new user's password
     * @param {Object} [data] - The new user's data to be registered
     *
     * @returns {Promise<string>} - The registered new user id
     */
    // registerUser(username, password, data) {
    //     return this._call('/user', 'post', {
    //         username,
    //         password,
    //         ...data
    //     }).then(({ status, data, error }) => {
    //         if (status === 'OK') return data.id;

    //         throw Error(error);
    //     });
    // },

    /**
     * Authenticates a user
     *
     * @async
     *
     * @param {string} email - The user's email
     * @param {string} password - The user's password
     *
     * @returns {Promise<string>} - The user id
     */
    authenticateUser: function authenticateUser(_ref2) {
        var _this = this;

        var email = _ref2.email,
            password = _ref2.password;

        return Promise.resolve().then(function () {
            if (typeof email !== 'string') throw Error('user email is not a string');

            if (!(email = email.trim()).length) throw Error('user email is empty or blank');

            if (typeof password !== 'string') throw Error('user password is not a string');

            if ((password = password.trim()).length === 0) throw Error('user password is empty or blank');

            return axios.post(_this.url + '/auth', { email: email, password: password }).then(function (_ref3) {
                var _ref3$data = _ref3.data,
                    status = _ref3$data.status,
                    data = _ref3$data.data;

                if (status === 'OK') {
                    _this.token(data.token);

                    return {
                        id: data.id,
                        role: data.role
                    };
                }
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    }

    /**
     * Retrieves a user
     *
     * @async
     *
     * @param {string} id - The user's id
     * @param {string} password - The user's password
     *
     * @returns {Promise<string>} - The user id
     */
    // retrieveUser(id) {
    //     return this._call(`/user/${id}`, 'get', undefined, true).then(
    //         ({ status, data, error }) => {
    //             if (status === 'OK') return data;

    //             throw Error(error);
    //         }
    //     );
    // }

};

if (typeof module !== 'undefined') module.exports = pintxopoteApi;
