import { User } from "../interface/user.model.interface";

export const MOCK_USERS: User[] = [
    {
        id: 1,
        username: 'admin',
        email: 'admin@example.com',
        role: 'ADMIN',
        password: 'admin123',
        fullName: 'John Doe',
    },
    {
        id: 2,
        username: 'customer1',
        email: 'customer1@example.com',
        role: 'CUSTOMER',
        password: 'customer123',
        fullName: 'Alice Smith',
    },
    {
        id: 3,
        username: 'customer2',
        email: 'customer2@example.com',
        role: 'CUSTOMER',
        password: 'customer123',
        fullName: 'Bob Johnson',
    }
];
