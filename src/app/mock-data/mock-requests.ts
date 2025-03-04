import { CarRequest } from "../interface/CarRequest.model.interface";

export const MOCK_REQUEST: CarRequest[] = [
    {
        id: 1,
        userID: 1,
        carID: 1, 
        status: 'In attesa',
        startReservation:'2025-03-01T10:00:00',
        endReservation: '2025-03-01T10:00:00',
        createdAt:'2025-02-20T08:30:00',
        updatedAt: '2025-02-20T08:30:00'
    },
    {
        id: 2,
        userID: 2,
        carID: 2, 
        status: 'Confermata',
        startReservation: '2025-03-01T10:00:00',
        endReservation: '2025-03-01T10:00:00',
        createdAt:'2025-02-20T08:30:00',
        updatedAt: '2025-02-20T08:30:00'
    },
    {
        id: 3,
        userID: 3,
        carID: 3,
        status: 'Annullata',
        startReservation: '2025-03-01T10:00:00',
        endReservation: '2025-03-01T10:00:00',
        createdAt: '2025-02-20T08:30:00',
        updatedAt: '2025-02-20T08:30:00'
    }
];
