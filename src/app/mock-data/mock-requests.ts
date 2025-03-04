import { CarRequest } from "../interface/CarRequest.model.interface";

export const MOCK_REQUEST: CarRequest[] = [
    {
        id: 1,
        userID: 1,
        carID: 1, 
        status: 'In attesa',
        startReservation:'2025-03-01T10:00:00',
        endReservation: '2025-03-01T10:00:00',
        created_at: new Date('2025-02-20T08:30:00'),
        updated_at: new Date('2025-02-20T08:30:00')
    },
    {
        id: 2,
        userID: 2,
        carID: 2, 
        status: 'Confermata',
        startReservation: '2025-03-01T10:00:00',
        endReservation: '2025-03-01T10:00:00',
        created_at: new Date('2025-02-21T09:15:00'),
        updated_at: new Date('2025-02-21T09:15:00')
    },
    {
        id: 3,
        userID: 3,
        carID: 3,
        status: 'Annullata',
        startReservation: '2025-03-01T10:00:00',
        endReservation: '2025-03-01T10:00:00',
        created_at: new Date('2025-02-22T11:45:00'),
        updated_at: new Date('2025-02-22T11:50:00')
    }
];
