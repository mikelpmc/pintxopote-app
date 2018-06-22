'use strict';

const moment = require('moment');

const today = moment().startOf('day');
const tomorrow = moment(today).endOf('day');

const {
    models: { User, UserAddress, Order, Pintxopote, Score, Pub, PubAddress },
    mongoose: {
        Types: { ObjectId }
    }
} = require('models');

const logic = {
    /**
     * ****************************************
     *              USERS
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

            // TODO: CHECK ADDRESS DATA

            return User.findOne({ email }).then(user => {
                if (user)
                    throw Error(`user with email ${email} already exists`);

                return User.create({
                    name,
                    surname,
                    email,
                    password,
                    role,
                    address
                }).then(res => {
                    return true;
                });
            });
        });
    },

    /**
     *
     * AUTHENTICATE USER
     *
     * @param {string} email
     * @param {string} password
     *
     * @returns {Promise<string>}
     */
    authenticateUser(email, password) {
        return Promise.resolve()
            .then(() => {
                if (typeof email !== 'string')
                    throw Error('user email is not a string');

                if (!(email = email.trim()).length)
                    throw Error('user email is empty or blank');

                if (typeof password !== 'string')
                    throw Error('user password is not a string');

                if ((password = password.trim()).length === 0)
                    throw Error('user password is empty or blank');

                return User.findOne({ email, password });
            })
            .then(user => {
                if (!user)
                    throw Error('¡Error! Las credenciales no son correctas');

                return {
                    id: user.id,
                    role: user.role
                };
            });
    },

    /**
     *
     * RETRIEVE USER
     *
     * @param {string} id
     *
     * @returns {Promise<User>}
     */
    retrieveUser(id) {
        return Promise.resolve()
            .then(() => {
                if (typeof id !== 'string')
                    throw Error('user id is not a string');

                if (!(id = id.trim()).length)
                    throw Error('user id is empty or blank');

                return User.findById(id).select({
                    _id: 0,
                    name: 1,
                    surname: 1,
                    email: 1,
                    address: 1,
                    role: 1,
                    creditCard: 1,
                    orders: 1
                });
            })
            .then(user => {
                if (!user) throw Error(`no user found with id ${id}`);

                return user;
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
     * @param {string} role
     * @param {object} address
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
        return Promise.resolve()
            .then(() => {
                if (typeof id !== 'string')
                    throw Error('user id is not a string');

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

                return User.findById(id);
            })
            .then(user => {
                if (!user)
                    throw Error('¡Error! Las credenciales no son correctas');

                if (user.id !== id)
                    throw Error(
                        `no user found with id ${id} for given credentials`
                    );

                if (newEmail) {
                    return User.findOne({ email: newEmail }).then(_user => {
                        if (_user && _user.id !== id)
                            throw Error(
                                `user with email ${newEmail} already exists`
                            );

                        return user;
                    });
                }

                return user;
            })
            .then(user => {
                user.name = name;
                user.surname = surname;
                user.email = newEmail ? newEmail : email;

                if (address !== undefined) user.address = address;

                if (creditCard !== undefined) user.creditCard = creditCard;

                return user.save();
            })
            .then(() => true);
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

            Order.findById(orderId)
                .then(order => {
                    if (!order)
                        throw Error(`no order found with id ${orderId}`);

                    return true;
                })
                .then(() => {
                    User.findById(userId).then(user => {
                        if (!user)
                            throw Error(`no user found with id ${userId}`);

                        user.orders.push(orderId);

                        user.save();

                        return true;
                    });
                });
        });
    },

    /**
     * ****************************************
     *              PINTXOPOTES
     * ****************************************
     */

    /**
     * @param {string} name
     * @param {string} [desc]
     * @param {string} [image]
     * @param {Date} date
     * @param {string} pub
     *
     * @throws {Error}
     *
     * @returns {Promise<Pintxopote>}
     */
    createPintxopote({
        name,
        desc = undefined,
        image = undefined,
        date = new Date(),
        pub
    }) {
        return Promise.resolve().then(() => {
            if (typeof name !== 'string')
                throw Error('pintxopote name is not a string');

            if (!(name = name.trim()).length)
                throw Error('pintxopote name is empty or blank');

            if (desc !== undefined) {
                if (typeof desc !== 'string')
                    throw Error('pintxopote desc is not a string');

                if (!(desc = desc.trim()).length)
                    throw Error('pintxopote desc is empty or blank');
            }

            if (image !== undefined) {
                if (typeof image !== 'string')
                    throw Error('pintxopote desc is not a string');

                if (!(image = image.trim()).length)
                    throw Error('pintxopote image is empty or blank');
            }

            if (date === '') throw Error('pintxopote date is empty or blank');

            if (typeof pub !== 'string')
                throw Error('pintxopote pub is not a string');

            if (!(pub = pub.trim()).length)
                throw Error('pintxopote pub is empty or blank');

            // TODO: CHECK IF THE PUB EXISTS

            return Pintxopote.create({ name, desc, image, date, pub }).then(
                () => true
            );
        });
    },

    /**
     *
     * LIST PINTXOPOTES BY CITY
     *
     *
     * @param {Object<String>} city
     * @param {Object<String>} sortBy
     * @param {Object<String>} orderBy
     *
     * @throws {Error}
     *
     * @returns {Promise<Pintxopote>}
     */
    listPintxopotesByCity({ city, sortBy = 'score', orderBy = 'desc' }) {
        return Promise.resolve().then(() => {
            // TODO: ERROR CASES

            return Pintxopote.find({
                date: {
                    $gte: today.toDate(),
                    $lt: tomorrow.toDate()
                }
            })
                .populate('pub')
                .then(async res => {
                    let foundPintxos = [];

                    res.forEach(r => {
                        const { city: _city } = r.pub.address;

                        if (_city.toLowerCase() === city.toLowerCase()) {
                            foundPintxos.push(r);
                        }
                    });

                    if (sortBy === 'score') {
                        if (orderBy === 'desc') {
                            foundPintxos = foundPintxos.sort((a, b) => {
                                const score1 = b.score.likes - b.score.dislikes;
                                const score2 = a.score.likes - a.score.dislikes;

                                return score1 - score2;
                            });
                        }
                    }

                    // WITH ORDERS
                    return Promise.all(
                        await foundPintxos.map(async pintxo => {
                            const _pintxo = pintxo;

                            return await this.getPintxopoteOrdersById({
                                pintxopoteId: _pintxo.id
                            }).then(orders => {
                                const res = Object.assign(
                                    { orders },
                                    pintxo._doc
                                );

                                return res;
                            });
                        })
                    );
                });
        });
    },

    /**
     *
     * LIST PINTXOPOTES BY PUB
     *
     * @param {string} pubId
     * @param {Date} date
     *
     * @throws {Error}
     *
     * @returns {Promise<Pintxopote>}
     */
    listPintxopotesByPub({ pubId, date = undefined }) {
        // TODO: ERROR CASES

        let findBy = { pub: pubId };
        if (date !== undefined) {
            findBy.date = date;
        }

        return Pintxopote.find(findBy).then(pintxopotes => {
            return pintxopotes;
        });
    },

    /**
     * GET PINTXOPOTE BY ID
     *
     * @param {string} pintxopoteId
     */
    getPintxopoteById({ id }) {
        return Promise.resolve().then(() => {
            if (typeof id !== 'string')
                throw Error('pintxopote id is not a string');

            if (!(id = id.trim()).length)
                throw Error('pintxopote id is empty or blank');

            return Pintxopote.findById(id)
                .populate('pub')
                .then(pintxo => {
                    if (!pintxo)
                        throw Error(
                            `No se ha encontrado un pintxo con el id ${id}`
                        );

                    return this.getPintxopoteOrdersById({
                        pintxopoteId: id
                    }).then(orders => {
                        const res = Object.assign({ orders }, pintxo._doc);

                        return res;
                    });
                });
        });
    },

    /**
     * ****************************************
     *              PUBS
     * ****************************************
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

            return Pub.find({ 'address.city': city }).then(res => {
                return res;
            });
        });
    },

    /**
     *
     * GET PUB BY ID
     *
     * @param {string} pubid
     *
     * @returns {Pub}
     */
    getPubById({ id }) {
        return Promise.resolve().then(() => {
            if (typeof id !== 'string') throw Error('pub id is not a string');

            if (!(id = id.trim()).length)
                throw Error('pub id is empty or blank');

            return Pub.findById(id)
                .populate('pintxopotes')
                .lean()
                .then(async pub => {
                    if (!pub)
                        throw Error(
                            `No se ha encontrado un pub con el id ${id}`
                        );

                    await Promise.all(
                        await pub.pintxopotes.map(async pintxo => {
                            return await this.getPintxopoteOrdersById({
                                pintxopoteId: pintxo._id.toString()
                            }).then(orders => {
                                pintxo.orders = orders;

                                return pintxo;
                            });
                        })
                    );

                    return pub;
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

            return Order.create({
                user,
                pintxopote,
                date,
                quantity,
                validated
            }).then(order => order);
        });
    },

    /**
     * GET ORDERS BY USER ID
     *
     * @param {string} userId
     *
     * @returns {Order[]}
     *
     */
    getOrdersByUserId({ userId }) {
        return Promise.resolve().then(() => {
            if (typeof userId !== 'string')
                throw Error('userId is not a string');

            if (!(userId = userId.trim()).length)
                throw Error('userId is empty or blank');

            return Order.find({ user: userId })
                .populate('pintxopote')
                .populate('pub')
                .then(orders => {
                    return orders;
                });
        });
    },

    /**
     * VALIDATE ORDER
     *
     *
     */
    validateOrder({ orderId }) {
        return Promise.resolve().then(() => {
            if (typeof orderId !== 'string')
                throw Error('orderId is not a string');

            if (!(orderId = orderId.trim()).length)
                throw Error('orderId is empty or blank');

            return Order.findById(orderId).then(order => {
                if (!order)
                    throw Error(
                        `No se ha encontrado una reserva con id ${orderId}`
                    );

                if (order.validated)
                    throw Error(
                        `La reserva con id ${orderId} ya ha sido validada`
                    );

                order.validated = true;

                order.save();

                return true;
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

            return Order.find({ pintxopote: pintxopoteId }).then(orders => {
                return orders;
            });
        });
    }
};

module.exports = logic;
