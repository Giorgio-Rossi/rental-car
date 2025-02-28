export interface Car {
    id: number;
    brand: string;
    model: string;
    license_plate: string | null;
    status: string;

    [key: string]: any;
}