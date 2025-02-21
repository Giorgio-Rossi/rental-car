import { Car } from "../interface/car.model.interface";

export const MOCK_CARS: Car[] = [
    {
        id: 1, 
        brand: 'Toyota',
        model: 'Corolla',
        license_plate: 'AB123CD',
        status: 'Disponibile'
    },
    {
        id: 2, 
        brand: 'Ford',
        model: 'Focus',
        license_plate: 'EF456GH',
        status: 'In manutenzione'
    },
    {
        id: 3,
        brand: 'Volkswagen',
        model: 'Golf',
        license_plate: 'IJ789KL',
        status: 'Noleggiata'
    },
    {
        id: 4, 
        brand: 'Fiat',
        model: 'Panda',
        license_plate: 'MN012OP',
        status: 'Disponibile'
    },
    {
        id: 5, 
        brand: 'Honda',
        model: 'Civic',
        license_plate: 'QR345ST',
        status: 'In manutenzione'
    }
];
