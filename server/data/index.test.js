'use strict';

require('dotenv').config();

const {
    mongoose,
    models: { User, UserAddress, Order, Pintxopote, Pub, Score, PubAddress }
} = require('.');

const expect = require('expect');

const {
    env: { DB_URL }
} = process;

describe('models', () => {
    // USER
    const userData = {
        name: 'John',
        surname: 'Doe',
        email: 'jd@mail.com',
        password: '123'
    };
    const userAddressData = {
        street: 'Calle Bilbao',
        city: 'Bilbao',
        postalCode: '48005',
        country: 'España'
    };

    // ORDER
    const orderData = {
        quantity: 5,
        validated: true,
        date: new Date('06/05/2018')
    };

    // PINTXOPOTE
    const pintxopoteData = {
        name: 'Pintxo 1',
        date: new Date('06/05/2018')
    };

    // PUB
    const pubData = {
        name: 'Bar Haizea'
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

    describe('create user', () => {
        it('should succeed on correct data', () => {
            const user = new User(userData);
            const userAddress = new UserAddress(userAddressData);

            user.address = userAddress;

            return user.save().then(user => {
                expect(user).toBeDefined();
                expect(user.name).toBe('John');
                expect(user.surname).toBe('Doe');
                expect(user.email).toBe('jd@mail.com');
                expect(user.password).toBe('123');

                expect(user.role).toBeDefined();
                expect(user.role.length).toBe(1);
                expect(user.role[0]).toBe('user');

                expect(user.address).toBeDefined();
                const { street, city, postalCode, country } = user.address;

                expect(street).toBe(userAddressData.street);
                expect(city).toBe(userAddressData.city);
                expect(postalCode).toBe(userAddressData.postalCode);
                expect(country).toBe(userAddressData.country);
            });
        });
    });

    describe('create order', () => {
        it('should success on correct data', () => {
            const user = new User(userData);
            const pintxopote = new Pintxopote(pintxopoteData);

            const order = new Order(orderData);

            order.user = user;
            order.pintxopote = pintxopote;

            return order.save().then(order => {
                expect(order).toBeDefined();

                const {
                    quantity,
                    validated,
                    date,
                    user: {
                        name: userName,
                        surname: userSurname,
                        email: userEmail,
                        password: userPassword
                    },
                    pintxopote: { name: pintxopoteName, date: pintxopoteDate }
                } = order;

                expect(quantity).toBe(orderData.quantity);
                expect(validated).toBeTruthy();
                expect(validated).toBe(orderData.validated);
                expect(date).toBe(orderData.date);

                expect(userName).toBe(userData.name);
                expect(userSurname).toBe(userData.surname);
                expect(userEmail).toBe(userData.email);
                expect(userPassword).toBe(userData.password);

                expect(pintxopoteName).toBe(pintxopoteData.name);
                expect(pintxopoteDate).toBe(pintxopoteData.date);
            });
        });
    });

    describe('create pintxopote', () => {
        it('should success on correct data', () => {
            const pub = new Pub(pubData);
            const pintxopote = new Pintxopote(pintxopoteData);

            pintxopote.pub = pub;

            return pintxopote.save().then(pintxopote => {
                expect(pintxopote).toBeDefined();

                const { name, date } = pintxopote;

                expect(name).toBe(pintxopoteData.name);
                expect(date).toBe(pintxopoteData.date);

                const {
                    pub: { name: pubName }
                } = pintxopote;
                expect(pubName).toBe(pubData.name);
            });
        });
    });

    describe('create pub', () => {
        it('should success on correct data', () => {
            const pub = new Pub(pubData);

            pub.save().then(pub => {
                expect(pub).toBeDefined();

                const { name } = pub;

                expect(name).toBe(pubData.name);
            });
        });
    });

    after(done =>
        mongoose.connection.db.dropDatabase(() =>
            mongoose.connection.close(done)
        )
    );
});
