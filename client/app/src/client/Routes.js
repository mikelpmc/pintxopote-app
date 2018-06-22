import {
    Home,
    Pubs,
    Pub,
    Pintxo,
    Login,
    Register,
    Profile,
    Reservas,
    ValidateOrder
} from './../client/pages/';

export default {
    routes: [
        {
            ...Home,
            path: '/',
            exact: true,
            id: 1
        },
        {
            ...Pubs,
            path: '/pubs',
            exact: true,
            id: 2
        },
        {
            ...Pub,
            path: '/pubs/:id',
            exact: true,
            id: 3
        },
        {
            ...Pintxo,
            path: '/pintxos/:id',
            exact: true,
            id: 4
        },
        {
            component: Login,
            path: '/login',
            id: 5
        },
        {
            component: Register,
            path: '/registro',
            id: 6
        }
    ],
    privateRoutes: [
        {
            component: Profile,
            path: '/perfil',
            id: 7
        },
        {
            component: Reservas,
            path: '/reservas',
            id: 8
        },
        {
            component: ValidateOrder,
            path: '/validate/order/:id',
            id: 9
        }
    ]
};
