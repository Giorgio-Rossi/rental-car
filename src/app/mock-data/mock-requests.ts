import { CarRequest } from "../interface/CarRequest.model.interface";

export const MOCK_REQUEST: CarRequest[] = [
    {
        id: 1,
        user_id: 1,
        car_id: [1], 
        status: 'In attesa',
        start_reservation: new Date('2025-03-01T10:00:00'),
        end_reservation: new Date('2025-03-05T10:00:00'),
        created_at: new Date('2025-02-20T08:30:00'),
        updated_at: new Date('2025-02-20T08:30:00')
    },
    {
        id: 2,
        user_id: 2,
        car_id: [2], 
        status: 'Confermata',
        start_reservation: new Date('2025-03-02T14:00:00'),
        end_reservation: new Date('2025-03-06T14:00:00'),
        created_at: new Date('2025-02-21T09:15:00'),
        updated_at: new Date('2025-02-21T09:15:00')
    },
    {
        id: 3,
        user_id: 3,
        car_id: [3],
        status: 'Annullata',
        start_reservation: new Date('2025-03-03T16:00:00'),
        end_reservation: new Date('2025-03-07T16:00:00'),
        created_at: new Date('2025-02-22T11:45:00'),
        updated_at: new Date('2025-02-22T11:50:00')
    }
];
