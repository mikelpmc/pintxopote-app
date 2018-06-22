/**
 * pintxopote API (client)
 *
 *
 * @author mikelpmc
 * @version 1.0.0
 */

const axios = require('axios');

const pintxopoteApi = {
    url: 'NO-URL',

    token(token) {
        if (token) {
            this._token = token;

            return;
        }

        return this._token;
    },

    /**
     * ****************************************
     * *************** USERS ******************
     * ****************************************
     */

    /**
     *
     * REGISTER USER
     *
     * @param {string} name
     * @param {string} surname
     * @param {string} email
     * @param {string} password
     * @param {string} [role]
     * @param {Object} [Address]
     *
     * @returns {Promise<boolean>}
     */
    registerUser({
        name,
        surname,
        email,
        password,
        role = 'user',
        address = undefined
    }) {
        return Promise.resolve().then(() => {
            if (typeof name !== 'string')
                throw Error('user name is not a string');

            if (!(name = name.trim()).length)
                throw Error('user name is empty or blank');

            if (typeof surname !== 'string')
                throw Error('user surname is not a string');

            if ((surname = surname.trim()).length === 0)
                throw Error('user surname is empty or blank');

            if (typeof email !== 'string')
                throw Error('user email is not a string');

            if (!(email = email.trim()).length)
                throw Error('user email is empty or blank');

            if (typeof password !== 'string')
                throw Error('user password is not a string');

            if ((password = password.trim()).length === 0)
                throw Error('user password is empty or blank');

            //TODO: Check Address Data

            const rest = {};

            if (address !== undefined) {
                rest.address = address;
            }

            return axios
                .post(`${this.url}/users`, {
                    name,
                    surname,
                    email,
                    password,
                    role,
                    ...rest
                })
                .then(({ status, data }) => {
                    if (status !== 201 || data.status !== 'OK')
                        throw Error(
                            `unexpected response status ${status} (${
                                data.status
                            })`
                        );

                    return true;
                })
                .catch(err => {
                    if (err.code === 'ECONNREFUSED')
                        throw Error('could not reach server');

                    if (err.response) {
                        const {
                            response: {
                                data: { error: message }
                            }
                        } = err;

                        throw Error(message);
                    } else throw err;
                });
        });
    },

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
    authenticateUser({ email, password }) {
        return Promise.resolve().then(() => {
            if (typeof email !== 'string')
                throw Error('user email is not a string');

            if (!(email = email.trim()).length)
                throw Error('user email is empty or blank');

            if (typeof password !== 'string')
                throw Error('user password is not a string');

            if ((password = password.trim()).length === 0)
                throw Error('user password is empty or blank');

            return axios
                .post(`${this.url}/auth`, { email, password })
                .then(({ status, data }) => {
                    if (status !== 200 || data.status !== 'OK')
                        throw Error(
                            `unexpected response status ${status} (${
                                data.status
                            })`
                        );

                    const {
                        data: { id, role, token }
                    } = data;

                    this.token(token);

                    return {
                        id: id,
                        role: role
                    };
                })
                .catch(err => {
                    if (err.code === 'ECONNREFUSED')
                        throw Error('could not reach server');

                    if (err.response) {
                        const {
                            response: {
                                data: { error: message }
                            }
                        } = err;

                        throw Error(message);
                    } else throw err;
                });
        });
    },

    /**
     * Retrieves a user
     *
     * @async
     *
     * @param {string} id - The user's id
     *
     * @returns {Promise<string>} - The user id
     */
    retrieveUser({ id }) {
        return Promise.resolve().then(() => {
            if (typeof id !== 'string') throw Error('user id is not a string');

            if (!(id = id.trim()).length)
                throw Error('user id is empty or blank');

            return axios
                .get(`${this.url}/users/${id}`, {
                    headers: { authorization: `Bearer ${this.token()}` }
                })
                .then(({ status, data }) => {
                    if (status !== 200 || data.status !== 'OK')
                        throw Error(
                            `unexpected response status ${status} (${
                                data.status
                            })`
                        );

                    const { data: user } = data;

                    return user;
                })
                .catch(err => {
                    if (err.code === 'ECONNREFUSED')
                        throw Error('could not reach server');

                    if (err.response) {
                        const {
                            response: {
                                data: { error: message }
                            }
                        } = err;

                        throw Error(message);
                    } else throw err;
                });
        });
    },

    /**
     * UPDATE USER
     *
     * @param {string} id
     * @param {string} name
     * @param {string} surname
     * @param {string} email
     * @param {string} password
     * @param {string} newEmail
     * @param {string} creditCard
     *
     * @returns {Promise<boolean>}
     */
    updateUser({
        id,
        name,
        surname,
        email,
        newEmail,
        role = 'user',
        address = undefined,
        creditCard = undefined
    }) {
        return Promise.resolve().then(() => {
            if (typeof id !== 'string') throw Error('user id is not a string');

            if (!(id = id.trim()).length)
                throw Error('user id is empty or blank');

            if (typeof name !== 'string')
                throw Error('user name is not a string');

            if (!(name = name.trim()).length)
                throw Error('user name is empty or blank');

            if (typeof surname !== 'string')
                throw Error('user surname is not a string');

            if ((surname = surname.trim()).length === 0)
                throw Error('user surname is empty or blank');

            if (typeof email !== 'string')
                throw Error('user email is not a string');

            if (!(email = email.trim()).length)
                throw Error('user email is empty or blank');

            //TODO: Check Address Data

            //TODO: Check credit card

            const rest = {};

            if (address !== undefined) {
                rest.address = address;
            }

            if (creditCard !== undefined) {
                rest.creditCard = creditCard;
            }

            return axios
                .patch(
                    `${this.url}/users/${id}`,
                    {
                        name,
                        surname,
                        email,
                        newEmail,
                        role,
                        ...rest
                    },
                    {
                        headers: { authorization: `Bearer ${this.token()}` }
                    }
                )
                .then(({ status, data }) => {
                    if (status !== 200 || data.status !== 'OK')
                        throw Error(
                            `unexpected response status ${status} (${
                                data.status
                            })`
                        );

                    return true;
                })
                .catch(err => {
                    if (err.code === 'ECONNREFUSED')
                        throw Error('could not reach server');

                    if (err.response) {
                        const {
                            response: {
                                data: { error: message }
                            }
                        } = err;

                        throw Error(message);
                    } else throw err;
                });
        });
    },

    /**
     * SAVE USER ORDER
     *
     * @param {string} orderId
     * @param {string} userId
     *
     * @returns {boolean}
     *
     * @throws {Promise<string>}
     */
    saveUserOrder({ orderId, userId }) {
        return Promise.resolve().then(() => {
            if (typeof orderId !== 'string')
                throw Error('order id is not a string');

            if (!(orderId = orderId.trim()).length)
                throw Error('order id is empty or blank');

            if (typeof userId !== 'string')
                throw Error('user id is not a string');

            if (!(userId = userId.trim()).length)
                throw Error('user id is empty or blank');

            return axios
                .post(
                    `${this.url}/users/orders`,
                    { orderId, userId },
                    {
                        headers: { authorization: `Bearer ${this.token()}` }
                    }
                )
                .then(({ status, data }) => {
                    if (status !== 200 || data.status !== 'OK')
                        throw Error(
                            `unexpected response status ${status} (${
                                data.status
                            })`
                        );

                    return true;
                })
                .catch(err => {
                    if (err.code === 'ECONNREFUSED')
                        throw Error('could not reach server');

                    if (err.response) {
                        const {
                            response: {
                                data: { error: message }
                            }
                        } = err;

                        throw Error(message);
                    } else throw err;
                });
        });
    },

    /**
     * **********************************************+
     * **************** PINTXOPOTES ******************
     * ***********************************************
     */

    /**
     * FETCH PINTXOPOTES BY CITY
     *
     * @param {string} city
     */
    fetchPintxosByCity({ city }) {
        return Promise.resolve().then(() => {
            if (typeof city !== 'string') throw Error('city is not a string');

            if (!(city = city.trim()).length)
                throw Error('city is empty or blank');

            return axios
                .get(`${this.url}/pintxos?city=${city}`)
                .then(({ status, data }) => {
                    if (status !== 200 || data.status !== 'OK')
                        throw Error(
                            `unexpected response status ${status} (${
                                data.status
                            })`
                        );

                    const { data: pintxos } = data;

                    return pintxos;
                })
                .catch(err => {
                    if (err.code === 'ECONNREFUSED')
                        throw Error('could not reach server');

                    if (err.response) {
                        const {
                            response: {
                                data: { error: message }
                            }
                        } = err;

                        throw Error(message);
                    } else throw err;
                });
        });
    },

    /**
     *
     * GET PINTXOPOTE BY ID
     *
     * @param {string} id
     */
    getPintxopoteById({ id }) {
        return Promise.resolve().then(() => {
            if (typeof id !== 'string') throw Error('pub id is not a string');

            if (!(id = id.trim()).length)
                throw Error('pub id is empty or blank');

            return axios
                .get(`${this.url}/pintxos/${id}`)
                .then(({ status, data }) => {
                    if (status !== 200 || data.status !== 'OK')
                        throw Error(
                            `unexpected response status ${status} (${
                                data.status
                            })`
                        );

                    const { data: pintxo } = data;

                    return pintxo;
                })
                .catch(err => {
                    if (err.code === 'ECONNREFUSED')
                        throw Error('could not reach server');

                    if (err.response) {
                        const {
                            response: {
                                data: { error: message }
                            }
                        } = err;

                        throw Error(message);
                    } else throw err;
                });
        });
    },

    /**
     * **********************************************+
     * ******************* PUBS *********************
     * ***********************************************
     */

    /**
     * LIST PUBS BY CITY
     *
     * @param {string} city
     *
     * @returns {Pub}
     */
    listPubsByCity({ city }) {
        return Promise.resolve().then(() => {
            if (typeof city !== 'string') throw Error('city is not a string');

            if (!(city = city.trim()).length)
                throw Error('city is empty or blank');

            return axios
                .get(`${this.url}/pubs?city=${city}`)
                .then(({ status, data }) => {
                    if (status !== 200 || data.status !== 'OK')
                        throw Error(
                            `unexpected response status ${status} (${
                                data.status
                            })`
                        );

                    const { data: pubs } = data;

                    return pubs;
                })
                .catch(err => {
                    if (err.code === 'ECONNREFUSED')
                        throw Error('could not reach server');

                    if (err.response) {
                        const {
                            response: {
                                data: { error: message }
                            }
                        } = err;

                        throw Error(message);
                    } else throw err;
                });
        });
    },

    /**
     * GET PUB BY ID
     *
     */
    getPubById({ id }) {
        return Promise.resolve().then(() => {
            if (typeof id !== 'string') throw Error('pub id is not a string');

            if (!(id = id.trim()).length)
                throw Error('pub id is empty or blank');

            return axios
                .get(`${this.url}/pubs/${id}`)
                .then(({ status, data }) => {
                    if (status !== 200 || data.status !== 'OK')
                        throw Error(
                            `unexpected response status ${status} (${
                                data.status
                            })`
                        );

                    const { data: pub } = data;

                    return pub;
                })
                .catch(err => {
                    if (err.code === 'ECONNREFUSED')
                        throw Error('could not reach server');

                    if (err.response) {
                        const {
                            response: {
                                data: { error: message }
                            }
                        } = err;

                        throw Error(message);
                    } else throw err;
                });
        });
    },

    /**
     * ****************************************
     *              ORDERS
     * ****************************************
     */

    /**
     * CREATE A ORDER
     */
    createOrder({
        user,
        pintxopote,
        date = new Date(),
        quantity,
        validated = false
    }) {
        return Promise.resolve().then(() => {
            //TODO: Error validations

            return axios
                .post(
                    `${this.url}/orders`,
                    { user, pintxopote, date, quantity, validated },
                    {
                        headers: { authorization: `Bearer ${this.token()}` }
                    }
                )
                .then(({ status, data }) => {
                    if (status !== 201 || data.status !== 'OK')
                        throw Error(
                            `unexpected response status ${status} (${
                                data.status
                            })`
                        );

                    const { data: order } = data;

                    return order;
                })
                .catch(err => {
                    if (err.code === 'ECONNREFUSED')
                        throw Error('could not reach server');

                    if (err.response) {
                        const {
                            response: {
                                data: { error: message }
                            }
                        } = err;

                        throw Error(message);
                    } else throw err;
                });
        });
    },

    /**
     * GET ORDERS BY USER ID
     */
    getOrdersByUserId({ userId }) {
        return Promise.resolve().then(() => {
            if (typeof userId !== 'string')
                throw Error('userId is not a string');

            if (!(userId = userId.trim()).length)
                throw Error('userId is empty or blank');

            return axios
                .get(`${this.url}/orders/${userId}`, {
                    headers: { authorization: `Bearer ${this.token()}` }
                })
                .then(({ status, data }) => {
                    if (status !== 200 || data.status !== 'OK')
                        throw Error(
                            `unexpected response status ${status} (${
                                data.status
                            })`
                        );

                    const { data: orders } = data;

                    return orders;
                })
                .catch(err => {
                    if (err.code === 'ECONNREFUSED')
                        throw Error('could not reach server');

                    if (err.response) {
                        const {
                            response: {
                                data: { error: message }
                            }
                        } = err;

                        throw Error(message);
                    } else throw err;
                });
        });
    },

    /**
     * VALIDATE ORDER
     */
    validateOrder({ orderId }) {
        return Promise.resolve().then(() => {
            if (typeof orderId !== 'string')
                throw Error('orderId is not a string');

            if (!(orderId = orderId.trim()).length)
                throw Error('orderId is empty or blank');

            return axios
                .get(`${this.url}/orders/${orderId}/validate`, {
                    headers: { authorization: `Bearer ${this.token()}` }
                })
                .then(({ status, data }) => {
                    if (status !== 200 || data.status !== 'OK')
                        throw Error(
                            `unexpected response status ${status} (${
                                data.status
                            })`
                        );

                    return true;
                })
                .catch(err => {
                    if (err.code === 'ECONNREFUSED')
                        throw Error('could not reach server');

                    if (err.response) {
                        const {
                            response: {
                                data: { error: message }
                            }
                        } = err;

                        throw Error(message);
                    } else throw err;
                });
        });
    },

    /**
     * GET PINTXOPOTE ORDERS
     */
    getPintxopoteOrdersById({ pintxopoteId }) {
        return Promise.resolve().then(() => {
            if (typeof pintxopoteId !== 'string')
                throw Error('pintxopote id is not a string');

            if (!(pintxopoteId = pintxopoteId.trim()).length)
                throw Error('pintxopote is empty or blank');

            return axios
                .get(`${this.url}/orders/pintxos/${pintxopoteId}`, {
                    headers: { authorization: `Bearer ${this.token()}` }
                })
                .then(({ status, data }) => {
                    if (status !== 200 || data.status !== 'OK')
                        throw Error(
                            `unexpected response status ${status} (${
                                data.status
                            })`
                        );

                    const { data: orders } = data;

                    return orders;
                })
                .catch(err => {
                    if (err.code === 'ECONNREFUSED')
                        throw Error('could not reach server');

                    if (err.response) {
                        const {
                            response: {
                                data: { error: message }
                            }
                        } = err;

                        throw Error(message);
                    } else throw err;
                });
        });
    }
};

if (typeof module !== 'undefined') module.exports = pintxopoteApi;
