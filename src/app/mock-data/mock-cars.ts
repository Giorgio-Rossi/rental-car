import { Car } from "../interface/car.model.interface";

export const MOCK_CARS: Car[] = [
    {
        id: 1, 
        brand: 'Toyota',
        model: 'Corolla',
        licensePlate: 'AB123CD',
        status: 'Disponibile',
        updatedAt: null
    },
    {
        id: 2, 
        brand: 'Ford',
        model: 'Focus',
        licensePlate: 'EF456GH',
        status: 'In manutenzione',
        updatedAt: null

    },
    {
        id: 3,
        brand: 'Volkswagen',
        model: 'Golf',
        licensePlate: 'IJ789KL',
        status: 'Noleggiata',
        updatedAt: null

    },
    {
        id: 4, 
        brand: 'Fiat',
        model: 'Panda',
        licensePlate: 'MN012OP',
        status: 'Disponibile',
        updatedAt: null
    },
    {
        id: 5, 
        brand: 'Honda',
        model: 'Civic',
        licensePlate: 'QR345ST',
        status: 'In manutenzione',
        updatedAt: null
    }
];
