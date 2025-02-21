export const MOCK_REQUEST = [
        {
          id: 1,
          user_id: 101,
          car_id: 201,
          status: 'In attesa',
          start_reservation: new Date('2025-03-01T10:00:00').toLocaleDateString('it-IT'),
          end_reservation: new Date('2025-03-05T10:00:00').toLocaleDateString('it-IT'),
          created_at: new Date('2025-02-20T08:30:00').toLocaleDateString('it-IT'),
          updated_at: new Date('2025-02-20T08:30:00').toLocaleDateString('it-IT')
        },
        {
          id: 2,
          user_id: 102,
          car_id: 202,
          status: 'Confermata',
          start_reservation: new Date('2025-03-02T14:00:00').toLocaleDateString('it-IT'),
          end_reservation: new Date('2025-03-06T14:00:00').toLocaleDateString('it-IT'),
          created_at: new Date('2025-02-21T09:15:00').toLocaleDateString('it-IT'),
          updated_at: new Date('2025-02-21T09:15:00').toLocaleDateString('it-IT')
        },
        {
          id: 3,
          user_id: 103,
          car_id: 203,
          status: 'Annullata',
          start_reservation: new Date('2025-03-03T16:00:00').toLocaleDateString('it-IT'),
          end_reservation: new Date('2025-03-07T16:00:00').toLocaleDateString('it-IT'),
          created_at: new Date('2025-02-22T11:45:00').toLocaleDateString('it-IT'),
          updated_at: new Date('2025-02-22T11:50:00')
        }
];
    
