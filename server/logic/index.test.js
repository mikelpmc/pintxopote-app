'use strict';

const moment = require('moment');

require('dotenv').config();

const {
    mongoose,
    models: { User, UserAddress, Order, Pintxopote, Score, Pub, PubAddress }
} = require('models');

const logic = require('.');

const { expect } = require('chai');
const _ = require('lodash');

const {
    env: { DB_URL }
} = process;

const FIREBASE_STORAGE_URL =
    'https://firebasestorage.googleapis.com/v0/b/pintxopote-skylab.appspot.com/o';

const today = new Date();

describe('logic (pintxopote)', () => {
    // USER
    const userData = {
        name: 'John',
        surname: 'Doe',
        email: 'jd@mail.com',
        password: '123'
    };

    const userAddressData = {
        street: 'Calle Bilbao',
        city: 'Bilbo',
        postalCode: '48005',
        country: 'España'
    };

    const userDataUpdated = {
        name: 'Juan',
        surname: 'Wayne',
        email: 'jd@mail.com',
        newEmail: 'jw@mail.com'
    };

    const userAddressDataUpdated = {
        street: 'Calle Piruleta',
        city: 'Basauri',
        postalCode: '48950',
        country: 'España'
    };

    // PINTXOPOTE
    const pintxopoteData = {
        name: 'Pintxo 1',
        date: today
    };

    // PUB
    const pubData = {
        name: 'Bar Haizea',
        address: {
            street: 'Somera',
            city: 'Bilbo',
            lat: '43.2300749',
            long: '-2.8432032'
        }
    };

    before(() => mongoose.connect(DB_URL));

    beforeEach(() =>
        Promise.all([
            User.remove(),
            UserAddress.remove(),
            Order.remove(),
            Pintxopote.remove(),
            Pub.remove(),
            Score.remove(),
            PubAddress.remove()
        ]));

    describe('User', () => {
        describe('register user', () => {
            it('should succeed on correct data', () => {
                return logic.registerUser(userData).then(res => {
                    expect(res).to.exist;
                    expect(res).to.be.true;
                });
            });

            it('should success with address data', () => {
                return logic
                    .registerUser({ ...userData, address: userAddressData })
                    .then(res => {
                        expect(res).to.exist;
                        expect(res).to.be.true;
                    });
            });

            it('should succeed on role pub given', () => {
                return logic
                    .registerUser({ ...userData, role: 'pub' })
                    .then(res => {
                        expect(res).to.exist;
                        expect(res).to.be.true;
                    });
            });

            it('should fail on non permited role given', () => {
                return logic
                    .registerUser({ ...userData, role: 'non-permited-role' })
                    .catch(({ message }) => {
                        expect(message).to.equal(
                            'User validation failed: role.0: `non-permited-role` is not a valid enum value for path `role`.'
                        );
                    });
            });

            it('should fail on already registered user', () =>
                User.create(userData)
                    .then(() => {
                        return logic.registerUser(userData);
                    })
                    .catch(({ message }) => {
                        expect(message).to.equal(
                            `user with email ${userData.email} already exists`
                        );
                    }));

            it('should fail on no user name', () =>
                logic
                    .registerUser({})
                    .catch(({ message }) =>
                        expect(message).to.equal('user name is not a string')
                    ));

            it('should fail on empty user name', () =>
                logic
                    .registerUser({ name: '' })
                    .catch(({ message }) =>
                        expect(message).to.equal('user name is empty or blank')
                    ));

            it('should fail on blank user name', () =>
                logic
                    .registerUser({ name: '     ' })
                    .catch(({ message }) =>
                        expect(message).to.equal('user name is empty or blank')
                    ));

            it('should fail on no user surname', () =>
                logic
                    .registerUser({ name: userData.name })
                    .catch(({ message }) =>
                        expect(message).to.equal('user surname is not a string')
                    ));

            it('should fail on empty user surname', () =>
                logic
                    .registerUser({ name: userData.name, surname: '' })
                    .catch(({ message }) =>
                        expect(message).to.equal(
                            'user surname is empty or blank'
                        )
                    ));

            it('should fail on blank user surname', () =>
                logic
                    .registerUser({ name: userData.name, surname: '     ' })
                    .catch(({ message }) =>
                        expect(message).to.equal(
                            'user surname is empty or blank'
                        )
                    ));

            it('should fail on no user email', () =>
                logic
                    .registerUser({
                        name: userData.name,
                        surname: userData.surname
                    })
                    .catch(({ message }) =>
                        expect(message).to.equal('user email is not a string')
                    ));

            it('should fail on empty user email', () =>
                logic
                    .registerUser({
                        name: userData.name,
                        surname: userData.surname,
                        email: ''
                    })
                    .catch(({ message }) =>
                        expect(message).to.equal('user email is empty or blank')
                    ));

            it('should fail on blank user email', () =>
                logic
                    .registerUser({
                        name: userData.name,
                        surname: userData.surname,
                        email: '     '
                    })
                    .catch(({ message }) =>
                        expect(message).to.equal('user email is empty or blank')
                    ));

            it('should fail on no user password', () =>
                logic
                    .registerUser({
                        name: userData.name,
                        surname: userData.surname,
                        email: userData.email
                    })
                    .catch(({ message }) =>
                        expect(message).to.equal(
                            'user password is not a string'
                        )
                    ));

            it('should fail on empty user password', () =>
                logic
                    .registerUser({
                        name: userData.name,
                        surname: userData.surname,
                        email: userData.email,
                        password: ''
                    })
                    .catch(({ message }) =>
                        expect(message).to.equal(
                            'user password is empty or blank'
                        )
                    ));

            it('should fail on blank user password', () =>
                logic
                    .registerUser({
                        name: userData.name,
                        surname: userData.surname,
                        email: userData.email,
                        password: '     '
                    })
                    .catch(({ message }) =>
                        expect(message).to.equal(
                            'user password is empty or blank'
                        )
                    ));
        });

        describe('authenticate user', () => {
            it('should succeed on correct data', () =>
                User.create(userData).then(() =>
                    logic.authenticateUser('jd@mail.com', '123').then(res => {
                        expect(res).to.exist;
                        const { id, role } = res;

                        expect(id).to.exist;
                        expect(role[0]).to.equal('user');
                    })
                ));

            it('should fail on no user email', () =>
                logic
                    .authenticateUser()
                    .catch(({ message }) =>
                        expect(message).to.equal('user email is not a string')
                    ));

            it('should fail on empty user email', () =>
                logic
                    .authenticateUser('')
                    .catch(({ message }) =>
                        expect(message).to.equal('user email is empty or blank')
                    ));

            it('should fail on blank user email', () =>
                logic
                    .authenticateUser('     ')
                    .catch(({ message }) =>
                        expect(message).to.equal('user email is empty or blank')
                    ));

            it('should fail on no user password', () =>
                logic
                    .authenticateUser(userData.email)
                    .catch(({ message }) =>
                        expect(message).to.equal(
                            'user password is not a string'
                        )
                    ));

            it('should fail on empty user password', () =>
                logic
                    .authenticateUser(userData.email, '')
                    .catch(({ message }) =>
                        expect(message).to.equal(
                            'user password is empty or blank'
                        )
                    ));

            it('should fail on blank user password', () =>
                logic
                    .authenticateUser(userData.email, '     ')
                    .catch(({ message }) =>
                        expect(message).to.equal(
                            'user password is empty or blank'
                        )
                    ));
        });

        describe('retrieve user', () => {
            it('should succeed on correct data', () =>
                User.create(userData)
                    .then(({ id }) => {
                        return logic.retrieveUser(id);
                    })
                    .then(user => {
                        expect(user).to.exist;

                        const {
                            name,
                            surname,
                            email,
                            _id,
                            password,
                            userType
                        } = user;

                        expect(name).to.equal('John');
                        expect(surname).to.equal('Doe');
                        expect(email).to.equal('jd@mail.com');

                        expect(_id).to.be.undefined;
                        expect(password).to.be.undefined;
                    }));

            it('should succeed on user with address data', () => {
                const address = new UserAddress(userAddressData);
                const user = new User(userData);

                user.address = address;

                return user
                    .save()
                    .then(({ id }) => {
                        return logic.retrieveUser(id);
                    })
                    .then(user => {
                        expect(user).to.exist;

                        const {
                            street,
                            city,
                            postalCode,
                            country
                        } = user.address;

                        expect(street).to.equal(userAddressData.street);
                        expect(city).to.equal(userAddressData.city);
                        expect(postalCode).to.equal(userAddressData.postalCode);
                        expect(country).to.equal(userAddressData.country);
                    });
            });

            //TODO: USER WITH ORDERS

            it('should fail on no user id', () =>
                logic
                    .retrieveUser()
                    .catch(({ message }) =>
                        expect(message).to.equal('user id is not a string')
                    ));

            it('should fail on empty user id', () =>
                logic
                    .retrieveUser('')
                    .catch(({ message }) =>
                        expect(message).to.equal('user id is empty or blank')
                    ));

            it('should fail on blank user id', () =>
                logic
                    .retrieveUser('     ')
                    .catch(({ message }) =>
                        expect(message).to.equal('user id is empty or blank')
                    ));
        });

        describe('udpate user', () => {
            it('should succeed on correct data', () =>
                User.create(userData).then(({ id }) => {
                    return logic
                        .updateUser({ id, ...userDataUpdated })
                        .then(res => {
                            expect(res).to.be.true;

                            return User.findById(id);
                        })
                        .then(user => {
                            expect(user).to.exist;

                            const { name, surname, email, password } = user;

                            expect(user.id).to.equal(id);
                            expect(name).to.equal(userDataUpdated.name);
                            expect(surname).to.equal(userDataUpdated.surname);
                            expect(email).to.equal(userDataUpdated.newEmail);
                        });
                }));

            it('should succeed with address data', () =>
                User.create({ ...userData, address: userAddressData }).then(
                    ({ id }) => {
                        return logic
                            .updateUser({
                                id,
                                ...userDataUpdated,
                                address: userAddressDataUpdated
                            })
                            .then(res => {
                                expect(res).to.be.true;

                                return User.findById(id);
                            })
                            .then(user => {
                                expect(user).to.exist;

                                const { name, surname, email, password } = user;

                                expect(user.id).to.equal(id);
                                expect(name).to.equal(userDataUpdated.name);
                                expect(surname).to.equal(
                                    userDataUpdated.surname
                                );
                                expect(email).to.equal(
                                    userDataUpdated.newEmail
                                );

                                expect(user.address).to.exist;

                                expect(user.address.street).to.equal(
                                    userAddressDataUpdated.street
                                );
                                expect(user.address.city).to.equal(
                                    userAddressDataUpdated.city
                                );
                                expect(user.address.postalCode).to.equal(
                                    userAddressDataUpdated.postalCode
                                );
                                expect(user.address.country).to.equal(
                                    userAddressDataUpdated.country
                                );
                            });
                    }
                ));

            false &&
                it("should fail on changing email to an already existing user's email", () =>
                    Promise.all([
                        User.create(userData),
                        User.create(otherUserData)
                    ])
                        .then(([{ id: id1 }, { id: id2 }]) => {
                            const { name, surname, email, password } = userData;

                            return logic.updateUser(
                                id1,
                                name,
                                surname,
                                email,
                                password,
                                otherUserData.email
                            );
                        })
                        .catch(({ message }) =>
                            expect(message).to.equal(
                                `user wfalse && ith email ${
                                    otherUserData.email
                                } already exists`
                            )
                        ));

            false &&
                it('should fail on no user id', () =>
                    logic
                        .updateUser()
                        .catch(({ message }) =>
                            expect(message).to.equal('user id is not a string')
                        ));

            false &&
                it('should fail on empty user id', () =>
                    logic
                        .updateUser('')
                        .catch(({ message }) =>
                            expect(message).to.equal(
                                'user id is empty or blank'
                            )
                        ));

            false &&
                it('should fail on blank user id', () =>
                    logic
                        .updateUser('     ')
                        .catch(({ message }) =>
                            expect(message).to.equal(
                                'user id is empty or blank'
                            )
                        ));

            false &&
                it('should fail on no user name', () =>
                    logic
                        .updateUser(dummyUserId)
                        .catch(({ message }) =>
                            expect(message).to.equal(
                                'user name is not a string'
                            )
                        ));

            false &&
                it('should fail on empty user name', () =>
                    logic
                        .updateUser(dummyUserId, '')
                        .catch(({ message }) =>
                            expect(message).to.equal(
                                'user name is empty or blank'
                            )
                        ));

            false &&
                it('should fail on blank user name', () =>
                    logic
                        .updateUser(dummyUserId, '     ')
                        .catch(({ message }) =>
                            expect(message).to.equal(
                                'user name is empty or blank'
                            )
                        ));

            false &&
                it('should fail on no user surname', () =>
                    logic
                        .updateUser(dummyUserId, userData.name)
                        .catch(({ message }) =>
                            expect(message).to.equal(
                                'user surname is not a string'
                            )
                        ));

            false &&
                it('should fail on empty user surname', () =>
                    logic
                        .updateUser(dummyUserId, userData.name, '')
                        .catch(({ message }) =>
                            expect(message).to.equal(
                                'user surname is empty or blank'
                            )
                        ));

            false &&
                it('should fail on blank user surname', () =>
                    logic
                        .updateUser(dummyUserId, userData.name, '     ')
                        .catch(({ message }) =>
                            expect(message).to.equal(
                                'user surname is empty or blank'
                            )
                        ));

            false &&
                it('should fail on no user email', () =>
                    logic
                        .updateUser(
                            dummyUserId,
                            userData.name,
                            userData.surname
                        )
                        .catch(({ message }) =>
                            expect(message).to.equal(
                                'user email is not a string'
                            )
                        ));

            false &&
                it('should fail on empty user email', () =>
                    logic
                        .updateUser(
                            dummyUserId,
                            userData.name,
                            userData.surname,
                            ''
                        )
                        .catch(({ message }) =>
                            expect(message).to.equal(
                                'user email is empty or blank'
                            )
                        ));

            false &&
                it('should fail on blank user email', () =>
                    logic
                        .updateUser(
                            dummyUserId,
                            userData.name,
                            userData.surname,
                            '     '
                        )
                        .catch(({ message }) =>
                            expect(message).to.equal(
                                'user email is empty or blank'
                            )
                        ));

            false &&
                it('should fail on no user password', () =>
                    logic
                        .updateUser(
                            dummyUserId,
                            userData.name,
                            userData.surname,
                            userData.email
                        )
                        .catch(({ message }) =>
                            expect(message).to.equal(
                                'user password is not a string'
                            )
                        ));

            false &&
                it('should fail on empty user password', () =>
                    logic
                        .updateUser(
                            dummyUserId,
                            userData.name,
                            userData.surname,
                            userData.email,
                            ''
                        )
                        .catch(({ message }) =>
                            expect(message).to.equal(
                                'user password is empty or blank'
                            )
                        ));

            false &&
                it('should fail on blank user password', () =>
                    logic
                        .updateUser(
                            dummyUserId,
                            userData.name,
                            userData.surname,
                            userData.email,
                            '     '
                        )
                        .catch(({ message }) =>
                            expect(message).to.equal(
                                'user password is empty or blank'
                            )
                        ));
        });

        describe('save user order', () => {
            it('should success on correct data', async () => {
                const user = new User(userData);
                const userId = user.id;

                const pub = new Pub(pubData);
                const pubId = pub.id;

                const pintxopote = new Pintxopote(pintxopoteData);
                const pintxopoteId = pintxopote.id;

                await Promise.all([user, pub, pintxopote]).then(async res => {
                    await user.save();
                    await pub.save();

                    pintxopote.pub = pubId;
                    await pintxopote.save();
                });

                return Order.create({
                    user: userId,
                    pintxopote: pintxopoteId,
                    quantity: 1,
                    validated: false,
                    date: new Date()
                }).then(order => {
                    return logic
                        .saveUserOrder({ orderId: order.id, userId })
                        .then(res => {
                            expect(res).to.be.true;
                        });
                });
            });
        });
    });

    describe('Pintxopote', () => {
        describe('create pintxopote', () => {
            it('should succeed on correct data', () => {
                let { _id: pubId } = new Pub(pubData);

                pubId = pubId.toString();

                const { name, date } = pintxopoteData;

                return logic
                    .createPintxopote({
                        name: 'Pintxo 1',
                        pub: '5b180037e4504a3aec776306',
                        desc: 'Rico rico y con fundamento',
                        photo: 'pintxo1.jpg'
                    })
                    .then(res => {
                        expect(res).to.be.true;
                    });
            });

            // TODO: ERROR CASES
        });

        describe('list pintxopotes by city (on current date)', () => {
            it('should succedd on correct data', async () => {
                // PINTXOPOTES AND PUBS

                const pub1 = new Pub({
                    name: 'Bar Haizea',
                    image: `${FIREBASE_STORAGE_URL}/pubs%2Fpub1.jpg?alt=media&token=3de54db2-15ba-43e0-88d9-166c6863e5f6`,
                    address: {
                        street: 'Somera',
                        city: 'Bilbo',
                        lat: '43.2300749',
                        long: '-2.8432032'
                    }
                });
                const pubId1 = pub1._id.toString();

                const pub2 = new Pub({
                    name: 'Askao Berri',
                    image: `${FIREBASE_STORAGE_URL}/pubs%2Fpub2.jpg?alt=media&token=276e5d68-898d-46c5-b0c7-eee44722ca99`,
                    address: {
                        street: 'Askao',
                        city: 'Bilbo',
                        lat: '43.2301124',
                        long: '-2.8432907'
                    }
                });
                const pubId2 = pub2._id.toString();

                const pub3 = new Pub({
                    name: 'William IV',
                    image: `${FIREBASE_STORAGE_URL}/pubs%2Fpub3.jpg?alt=media&token=dc567394-9373-41ff-a292-7c5416e18d96`,
                    address: {
                        street: 'Somera',
                        city: 'Bilbo',
                        lat: '43.2300391',
                        long: '-2.8432651'
                    }
                });
                const pubId3 = pub3._id.toString();

                const pintxopote1 = new Pintxopote({
                    name: 'Pintxo 1 (Bar Haizea)',
                    date: today,
                    image: `${FIREBASE_STORAGE_URL}/pintxos%2Fpintxo1.jpg?alt=media&token=d53fb70e-11de-409a-9161-a82c23c6b701`,
                    pub: pubId1,
                    score: {
                        likes: 20,
                        dislikes: 10
                    }
                });

                const pintxopote2 = new Pintxopote({
                    name: 'Pintxo 2 (Askao Berri)',
                    date: new Date('2018-06-11'),
                    image: `${FIREBASE_STORAGE_URL}/pintxos%2Fpintxo2.jpg?alt=media&token=89522ee0-9768-41d8-9331-9aa9bbee91f0`,
                    pub: pubId2,
                    score: {
                        likes: 80,
                        dislikes: 81
                    }
                });

                const pintxopote3 = new Pintxopote({
                    name: 'Pintxo 3 (William IV)',
                    date: today,
                    image: `${FIREBASE_STORAGE_URL}/pintxos%2Fpintxo3.jpg?alt=media&token=f400bc9a-9dff-4c5c-bc5d-535e8601b2e0`,
                    pub: pubId3,
                    score: {
                        likes: 200,
                        dislikes: 40
                    }
                });

                await pintxopote1.save().then(async res => {
                    pub1.pintxopotes = res._id;
                    await pub1.save();
                });

                await pintxopote2.save().then(async res => {
                    pub2.pintxopotes = res._id;
                    await pub2.save();
                });

                await pintxopote3.save().then(async res => {
                    pub3.pintxopotes = res._id;
                    await pub3.save();
                });

                return logic
                    .listPintxopotesByCity({ city: 'bilbo' })
                    .then(res => {
                        expect(res).to.exist;
                        expect(res.length).to.equal(2);
                        expect(res[0].name).to.equal('Pintxo 3 (William IV)');
                        expect(res[1].name).to.equal('Pintxo 1 (Bar Haizea)');
                    });
            });

            // TODO: ERROR CASES
        });

        describe('list pintxopotes by pub (on current date)', () => {
            it('should succeed on correct data', () => {
                const pintxopote1 = new Pintxopote({
                    name: 'Pintxo 1',
                    date: today
                });

                const pintxopote2 = new Pintxopote({
                    name: 'Pintxo 2',
                    date: new Date('2018-06-05')
                });

                const pintxopote3 = new Pintxopote({
                    name: 'Pintxo 3',
                    date: today
                });

                const pub1 = new Pub({ name: 'Bar Haizea' });
                const pubId1 = pub1._id.toString();

                pintxopote1.pub = pubId1;
                pintxopote2.pub = pubId1;

                let { _id: pubId2 } = new Pub({ name: 'Sorgiñe' });
                pubId2 = pubId2.toString();

                pintxopote3.pub = pubId2;

                return Promise.all([
                    pintxopote1,
                    pintxopote2,
                    pintxopote3
                ]).then(res => {
                    return Promise.all(
                        res.map(p => {
                            return p.save();
                        })
                    ).then(res => {
                        return logic
                            .listPintxopotesByPub({
                                pubId: pubId1,
                                date: today
                            })
                            .then(res => {
                                expect(res).to.be.exist;
                                expect(res.length).to.equal(1);

                                expect(res[0].name).to.equal('Pintxo 1');
                                expect(res[0].name).not.to.equal('Pintxo 3');
                            });
                    });
                });
            });

            // TODO: ERROR CASES
        });

        // TODO: List pintxopotes by Pub (All dates)

        describe('get pintxopote by id', () => {
            it('should sucess on correct data', async () => {
                const pub1 = new Pub({
                    name: 'Bar Haizea',
                    image: `${FIREBASE_STORAGE_URL}/pubs%2Fpub1.jpg?alt=media&token=3de54db2-15ba-43e0-88d9-166c6863e5f6`,
                    address: {
                        street: 'Somera',
                        city: 'Galdakao',
                        lat: '43.230124',
                        long: '-2.842205'
                    },
                    desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a felis ac dolor condimentum feugiat sed a urna. Integer in leo sed nisl feugiat dapibus sit amet a ex. Mauris semper finibus erat vitae molestie. Nulla eleifend arcu nec vestibulum laoreet. Maecenas non interdum leo, a fringilla ligula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec vestibulum metus a lobortis aliquam. Morbi eu ipsum tincidunt elit dignissim laoreet. Suspendisse finibus rutrum sem eget luctus.
            
                    Quisque sit amet vestibulum purus, nec luctus metus. Proin dignissim sapien non gravida placerat. Fusce eu tristique lacus, nec sollicitudin erat. Nullam felis magna, ornare sed eros id, fermentum lobortis odio. Vivamus vulputate magna vitae justo pharetra, in cursus est rutrum. Duis ultrices lorem sed mi vulputate aliquet. Proin eget neque sit amet mi lacinia porta vel et dui. Cras convallis aliquam tortor, eget viverra purus elementum vestibulum. Curabitur vel porttitor lorem. Aenean cursus at sem sed blandit. Nullam consequat vitae ex at imperdiet. Cras tellus dolor, ultrices sed vulputate lacinia, commodo vel ligula. Sed tempor ex ut metus lobortis vehicula. Donec arcu dolor, mattis non lorem et, tempus feugiat sapien.`
                });
                const pubId1 = pub1._id.toString();

                const pintxopote1 = new Pintxopote({
                    name: 'Pintxo 1 (Bar Haizea)',
                    date: today,
                    image: `${FIREBASE_STORAGE_URL}/pintxos%2Fpintxo1.jpg?alt=media&token=d53fb70e-11de-409a-9161-a82c23c6b701`,
                    pub: pubId1,
                    score: {
                        likes: 20,
                        dislikes: 10
                    }
                });

                await pintxopote1.save().then(async res => {
                    pub1.pintxopotes = res._id;
                    await pub1.save();
                });

                return logic
                    .getPintxopoteById({ id: pintxopote1.id })
                    .then(pintxo => {
                        expect(pintxo).to.exist;

                        expect(pintxo.name).to.equal('Pintxo 1 (Bar Haizea)');
                    });
            });
        });
    });

    describe('Pub', () => {
        describe('list pubs by city', () => {
            it('should success on correct data', async () => {
                const pub1 = new Pub(pubData);
                const pub2 = new Pub({
                    name: 'Zurrut',
                    address: {
                        street: 'Somera',
                        city: 'Galdakao',
                        lat: '43.2300749',
                        long: '-2.8432032'
                    }
                });

                await Promise.all([pub1, pub2]).then(async res => {
                    await pub1.save();
                    await pub2.save();
                });

                return logic.listPubsByCity({ city: 'Bilbo' }).then(pubs => {
                    expect(pubs).to.exist;
                    expect(pubs).not.to.be.empty;
                    expect(pubs.length).to.equal(1);

                    const {
                        name,
                        address: { street, city }
                    } = pubs[0];

                    expect(name).to.equal('Bar Haizea');
                    expect(street).to.equal('Somera');
                    expect(city).to.equal('Bilbo');
                });
            });
        });

        describe('get pub by id', () => {
            it('should success on correct data', async () => {
                const pub1 = new Pub(pubData);

                const pubId1 = pub1.id;

                const pintxopote1 = new Pintxopote({
                    name: 'Pintxo 1 (Bar Haizea)',
                    date: today,
                    image: `${FIREBASE_STORAGE_URL}/pintxos%2Fpintxo1.jpg?alt=media&token=d53fb70e-11de-409a-9161-a82c23c6b701`,
                    pub: pubId1,
                    score: {
                        likes: 20,
                        dislikes: 10
                    }
                });

                const pintxopote2 = new Pintxopote({
                    name: 'Pintxo 2 (Askao Berri)',
                    date: new Date('2018-06-11'),
                    image: `${FIREBASE_STORAGE_URL}/pintxos%2Fpintxo2.jpg?alt=media&token=89522ee0-9768-41d8-9331-9aa9bbee91f0`,
                    pub: pubId1,
                    score: {
                        likes: 80,
                        dislikes: 81
                    }
                });

                await pintxopote1.save().then(res => {
                    pub1.pintxopotes.push(res.id);
                });

                await pintxopote2.save().then(res => {
                    pub1.pintxopotes.push(res.id);
                });

                await pub1.save();

                return logic.getPubById({ id: pubId1 }).then(pub => {
                    expect(pub).to.exist;

                    expect(pub.pintxopotes.length).to.equal(2);

                    expect(pub.name).to.equal('Bar Haizea');
                    expect(pub.address.street).to.equal('Somera');
                });
            });

            // TODO: ERROR CASES
        });
    });

    describe('Order', () => {
        describe('create a order', () => {
            it('should success on correct data', async () => {
                const user = new User(userData);

                const pub = new Pub(pubData);
                const pintxo = new Pintxopote(pintxopoteData);

                pintxo.pub = pub.id;

                await Promise.all([user, pub, pintxo]).then(async res => {
                    await user.save();
                    await pub.save();
                    await pintxo.save();
                });

                const _userId = user.id;
                const _pintxoId = pintxo.id;

                return logic
                    .createOrder({
                        user: _userId,
                        pintxopote: _pintxoId,
                        quantity: 2
                    })
                    .then(order => {
                        expect(order).to.exist;
                        expect(order).to.been.an.instanceOf(Order);

                        const { user, pintxopote, quantity, validated } = order;

                        expect(user.toString()).to.equal(_userId);
                        expect(pintxopote.toString()).to.equal(_pintxoId);
                        expect(quantity).to.equal(2);
                        expect(validated).to.be.false;
                    });
            });
        });

        describe('get orders by user id', async () => {
            it('should sucess on correct data', () => {
                const user = new User(userData);
                const user2 = new User({
                    name: 'Juan',
                    surname: 'Williams',
                    email: 'jw@mail.com',
                    password: '456'
                });

                const pub = new Pub(pubData);

                const pintxo1 = new Pintxopote(pintxopoteData);

                pintxo1.pub = pub.id;

                const _userId = user.id;
                const _userId_2 = user2.id;

                const _pintxo1_id = pintxo1.id;

                return Order.create({
                    user: _userId,
                    pintxopote: _pintxo1_id,
                    quantity: 2,
                    validated: false,
                    date: today
                }).then(() => {
                    return Order.create({
                        user: _userId_2,
                        pintxopote: _pintxo1_id,
                        quantity: 1,
                        validated: false,
                        date: today
                    }).then(() => {
                        return logic
                            .getOrdersByUserId({ userId: _userId })
                            .then(orders => {
                                expect(orders).to.exist;

                                expect(orders.length).to.equal(1);
                                expect(orders[0].quantity).to.equal(2);
                            });
                    });
                });
            });
        });

        //TODO: VALIDATE ORDER

        //TODO: getPintxopoteOrdersById
    });

    after(done =>
        mongoose.connection.db.dropDatabase(() =>
            mongoose.connection.close(done)
        )
    );
});
