export interface Car {
    id: number;
    brand: string;
    model: string;
    license_plate: string;
    status: string;

    [key: string]: any;
}