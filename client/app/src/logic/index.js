const pintxopoteApi = require('api-client');

// pintxopoteApi.url = 'http://localhost:5000/api';
pintxopoteApi.url = 'https://secure-reef-96406.herokuapp.com/api';

const logic = {
    /**
     * ****************************************
     * *************** USERS ******************
     * ****************************************
     */

    /**
     * GET/SET USER ID
     *
     * @param {string} userId
     */
    userId(userId) {
        if (userId) {
            this.userId = userId;

            return;
        }

        return this.userId;
    },

    /**
     *
     * GET / SET USER ROLE
     *
     * @param {string} userRole
     *
     * @returns {undefined}
     * @returns {string}
     */
    userRole(userRole) {
        if (userRole) {
            this.userRole = userRole;

            return;
        }

        return this.userRole;
    },

    /**
     *
     * REGISTER A USER
     *
     * @param {string} name
     * @param {string} surname
     * @param {string} email
     * @param {string} password
     *
     * @returns {boolean}
     *
     * @throws {Promise<string>}
     */
    registerUser({ name, surname, email, password }) {
        return pintxopoteApi
            .registerUser({ name, surname, email, password })
            .then(() => true)
            .catch(({ message }) => Promise.reject(message));
    },

    /**
     * LOGIN USER
     *
     * @param {string} email
     * @param {string} password
     *
     * @returns {boolean}
     *
     * @throws {Promise<string>}
     */
    login({ email, password }) {
        return pintxopoteApi
            .authenticateUser({
                email,
                password
            })
            .then(({ id, role }) => {
                this.userId(id);
                this.userRole(role[0]);

                return true;
            })
            .then(() => this.getUser())
            .catch(({ message }) => {
                this.logout();

                return Promise.reject(message);
            });
    },

    /**
     * GET USER INFO
     *
     * @returns {User<string>}
     *
     * @throws {Promise<string>}
     */
    getUser() {
        return pintxopoteApi
            .retrieveUser({ id: this.userId() })
            .then(user => {
                return user;
            })
            .catch(({ message }) => Promise.reject(message));
    },

    /**
     * CHECK IF USER IS LOGGED
     *
     * @returns {boolean}
     */
    isLogged() {
        const userId = this.userId();
        const token = pintxopoteApi.token();

        return typeof userId === 'string' && typeof token === 'string';
    },

    /**
     * Logs out a user
     * Clears the session storage
     *
     * @returns {Promise}
     */
    logout() {
        return Promise.resolve().then(() => {
            this.userId(null);
            this.userRole(null);
            pintxopoteApi.token(null);
        });
    },

    /**
     * UPDATE USER
     *
     * @param {string} name
     * @param {string} surname
     * @param {string} email
     * @param {string} newEmail
     * @param {string} role
     * @param {object} address
     * @param {string} creditCard
     *
     * @returns {boolean}
     *
     * @throws {Promise<string>}
     */
    updateUser({
        name,
        surname,
        email,
        newEmail,
        role = 'user',
        address = undefined,
        creditCard
    }) {
        return pintxopoteApi
            .updateUser({
                id: this.userId(),
                name,
                surname,
                email,
                newEmail: email,
                role,
                address,
                creditCard
            })
            .then(res => this.getUser())
            .catch(({ message }) => {
                return Promise.reject(message);
            });
    },

    /**
     * SAVE USER ORDER
     */
    saveUserOrder({ orderId }) {
        return pintxopoteApi
            .saveUserOrder({ orderId, userId: this.userId() })
            .then(() => true)
            .catch(({ message }) => Promise.reject(message));
    },

    /**
     * ***********************************************
     * **************** PINTXOPOTES ******************
     * ***********************************************
     */

    /**
     * FETCH PINTXOPOTES BY CITY
     *
     * @param {string} city
     */
    fetchPintxosByCity({ city }) {
        return pintxopoteApi
            .fetchPintxosByCity({ city })
            .then(pintxopotes => pintxopotes)
            .catch(({ message }) => Promise.reject(message));
    },

    /**
     * GET PINTXOPOTE BY ID
     *
     * @param {string} id
     *
     * @returns {Pintxopote}
     *
     * @throws {Promise<string>}
     */
    getPintxopoteById({ id }) {
        return pintxopoteApi
            .getPintxopoteById({ id })
            .then(pintxopote => pintxopote)
            .catch(({ message }) => Promise.reject(message));
    },

    /**
     * ***********************************************
     * ******************* PUBS **********************
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
        return pintxopoteApi
            .listPubsByCity({ city })
            .then(pubs => pubs)
            .catch(({ message }) => Promise.reject(message));
    },

    /**
     * GET PUB BY ID
     *
     * @param {string} id
     *
     * @returns {Pub}
     *
     * @throws {Promise<string>}
     */
    getPubById({ id }) {
        return pintxopoteApi
            .getPubById({ id })
            .then(pub => pub)
            .catch(({ message }) => Promise.reject(message));
    },

    /**
     * ***********************************************
     * ******************* ORDERS ********************
     * ***********************************************
     */

    /**
     * CREATE A ORDER
     */
    createOrder({
        pintxopote,
        date = new Date(),
        quantity,
        validated = false
    }) {
        const user = this.userId();

        return pintxopoteApi
            .createOrder({ user, pintxopote, date, quantity, validated })
            .then(order => {
                return this.saveUserOrder({ orderId: order._id });
            })
            .catch(({ message }) => Promise.reject(message));
    },

    /**
     * GET ORDERS BY USER ID
     *
     *
     * @returns {Order[]}
     *
     * @throws {Promise<string>}
     */
    getOrdersByUserId() {
        const userId = this.userId();

        return pintxopoteApi
            .getOrdersByUserId({ userId })
            .then(orders => orders)
            .catch(({ message }) => Promise.reject(message));
    },

    /**
     * VALIDATE ORDER
     */
    validateOrder({ orderId }) {
        return pintxopoteApi
            .validateOrder({ orderId })
            .then(() => true)
            .catch(({ message }) => Promise.reject(message));
    },

    /**
     * GET PINTXOPOTE ORDERS
     */
    getPintxopoteOrdersById({ pintxopoteId }) {
        return pintxopoteApi
            .getPintxopoteOrdersById({ pintxopoteId })
            .then(orders => orders)
            .catch(({ message }) => {
                return Promise.reject(message);
            });
    }
};

module.exports = logic;
