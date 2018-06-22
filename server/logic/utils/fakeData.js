// CREATE FAKE DATA ON BBDD
'use strict';

require('dotenv').config();

const today = new Date();

const {
    mongoose,
    models: { User, UserAddress, Order, Pintxopote, Score, Pub, PubAddress }
} = require('models');

const {
    env: { DB_URL_PROD }
} = process;

mongoose.connect(DB_URL_PROD);

const FIREBASE_STORAGE_URL =
    'https://firebasestorage.googleapis.com/v0/b/pintxopote-skylab.appspot.com/o';

(async () => {
    await Promise.all([
        User.remove(),
        UserAddress.remove(),
        Order.remove(),
        Pintxopote.remove(),
        Pub.remove(),
        Score.remove(),
        PubAddress.remove()
    ]);

    // CREATE A USERS

    // ROLE USER
    const userData = {
        name: 'Mikel',
        surname: 'Parra',
        email: 'mikel@mail.com',
        password: '123',
        address: {
            street: 'Calle Bilbao',
            city: 'Galdakao',
            postalCode: '48960',
            country: 'Euskal Herria'
        }
    };
    const user1 = new User(userData);

    await user1.save();

    // ROLE PUB
    const userDataPub = {
        name: 'Janire',
        surname: 'Espuma',
        email: 'janire@mail.com',
        password: '123',
        address: {
            street: 'Calle Somera',
            city: 'Galdakao',
            postalCode: '48005',
            country: 'España'
        },
        role: 'pub'
    };
    await User.create(userDataPub);

    // PINTXOPOTES AND PUBS

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

    const pub2 = new Pub({
        name: 'Topa',
        image: `${FIREBASE_STORAGE_URL}/pubs%2Fpub2.jpg?alt=media&token=276e5d68-898d-46c5-b0c7-eee44722ca99`,
        address: {
            street: 'Bilbo Kalea',
            city: 'Galdakao',
            lat: '43.230997',
            long: '-2.841089'
        },
        desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a felis ac dolor condimentum feugiat sed a urna. Integer in leo sed nisl feugiat dapibus sit amet a ex. Mauris semper finibus erat vitae molestie. Nulla eleifend arcu nec vestibulum laoreet. Maecenas non interdum leo, a fringilla ligula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec vestibulum metus a lobortis aliquam. Morbi eu ipsum tincidunt elit dignissim laoreet. Suspendisse finibus rutrum sem eget luctus.

                Quisque sit amet vestibulum purus, nec luctus metus. Proin dignissim sapien non gravida placerat. Fusce eu tristique lacus, nec sollicitudin erat. Nullam felis magna, ornare sed eros id, fermentum lobortis odio. Vivamus vulputate magna vitae justo pharetra, in cursus est rutrum. Duis ultrices lorem sed mi vulputate aliquet. Proin eget neque sit amet mi lacinia porta vel et dui. Cras convallis aliquam tortor, eget viverra purus elementum vestibulum. Curabitur vel porttitor lorem. Aenean cursus at sem sed blandit. Nullam consequat vitae ex at imperdiet. Cras tellus dolor, ultrices sed vulputate lacinia, commodo vel ligula. Sed tempor ex ut metus lobortis vehicula. Donec arcu dolor, mattis non lorem et, tempus feugiat sapien.`
    });
    const pubId2 = pub2._id.toString();

    const pub3 = new Pub({
        name: 'William IV',
        image: `${FIREBASE_STORAGE_URL}/pubs%2Fpub3.jpg?alt=media&token=dc567394-9373-41ff-a292-7c5416e18d96`,
        address: {
            street: 'Santi Brouard',
            city: 'Galdakao',
            lat: '43.230048',
            long: '-2.842768'
        },
        desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a felis ac dolor condimentum feugiat sed a urna. Integer in leo sed nisl feugiat dapibus sit amet a ex. Mauris semper finibus erat vitae molestie. Nulla eleifend arcu nec vestibulum laoreet. Maecenas non interdum leo, a fringilla ligula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec vestibulum metus a lobortis aliquam. Morbi eu ipsum tincidunt elit dignissim laoreet. Suspendisse finibus rutrum sem eget luctus.

                Quisque sit amet vestibulum purus, nec luctus metus. Proin dignissim sapien non gravida placerat. Fusce eu tristique lacus, nec sollicitudin erat. Nullam felis magna, ornare sed eros id, fermentum lobortis odio. Vivamus vulputate magna vitae justo pharetra, in cursus est rutrum. Duis ultrices lorem sed mi vulputate aliquet. Proin eget neque sit amet mi lacinia porta vel et dui. Cras convallis aliquam tortor, eget viverra purus elementum vestibulum. Curabitur vel porttitor lorem. Aenean cursus at sem sed blandit. Nullam consequat vitae ex at imperdiet. Cras tellus dolor, ultrices sed vulputate lacinia, commodo vel ligula. Sed tempor ex ut metus lobortis vehicula. Donec arcu dolor, mattis non lorem et, tempus feugiat sapien.`
    });
    const pubId3 = pub3._id.toString();

    const pintxopote1 = new Pintxopote({
        name: 'Pintxo de foie',
        date: today,
        image: `${FIREBASE_STORAGE_URL}/pintxos%2Fpintxo1.jpg?alt=media&token=d53fb70e-11de-409a-9161-a82c23c6b701`,
        pub: pubId1,
        score: {
            likes: 20,
            dislikes: 10
        }
    });

    const pintxopote2 = new Pintxopote({
        name: 'Lasaña de bocado',
        date: today,
        image: `${FIREBASE_STORAGE_URL}/pintxos%2Fpintxo2.jpg?alt=media&token=89522ee0-9768-41d8-9331-9aa9bbee91f0`,
        pub: pubId2,
        score: {
            likes: 80,
            dislikes: 81
        }
    });

    const pintxopote3 = new Pintxopote({
        name: 'Chistorra con huevo',
        date: today,
        image: `${FIREBASE_STORAGE_URL}/pintxos%2Fpintxo3.jpg?alt=media&token=f400bc9a-9dff-4c5c-bc5d-535e8601b2e0`,
        pub: pubId3,
        score: {
            likes: 200,
            dislikes: 40
        }
    });

    const pintxopote4 = new Pintxopote({
        name: 'Lilam veggie',
        date: today,
        image: `${FIREBASE_STORAGE_URL}/pintxos%2Fpintxo4.jpg?alt=media&token=747ee66f-c76e-46fc-b60e-0117361f2ea6`,
        pub: pubId1,
        score: {
            likes: 1200,
            dislikes: 1
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

    await pintxopote4.save().then(async res => {
        pub1.pintxopotes = res._id;
        await pub1.save();
    });

    // ORDERS

    const order1 = new Order({
        user: user1.id,
        pintxopote: pintxopote1.id,
        quantity: 2,
        date: today,
        validated: false
    });

    const order2 = new Order({
        user: user1.id,
        pintxopote: pintxopote2.id,
        quantity: 4,
        date: today,
        validated: false
    });

    const order3 = new Order({
        user: user1.id,
        pintxopote: pintxopote1.id,
        quantity: 1,
        date: new Date('2018-06-15'),
        validated: false
    });

    // await order1.save().then(async res => {
    //     user1.orders.push(order1.id)
    // });

    // await order2.save().then(async res => {
    //     user1.orders.push(order2.id)
    // });

    // await order3.save().then(async res => {
    //     user1.orders.push(order3.id)
    // });

    // await user1.save();

    mongoose.disconnect();
})();
