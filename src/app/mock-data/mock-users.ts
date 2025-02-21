import { User } from "../interface/user.model.interface";

export const MOCK_USERS = [
    {
        id: 1,
        username: 'admin',
        password: 'admin123',
        type: 'ADMIN'
    },
    {
        id: 2,
        username: '+',
        password: 'customer123',
        type: 'CUSTOMER'
    },
    {
        id: 3,
        username: 'customer2',
        password: 'customer123',
        type: 'CUSTOMER'
    }
];