export interface CarRequest {
    id: number;
    userID: number;
    carID: number;
    status: string;
    startReservation: Date | null;
    endReservation: Date | null;
    created_at: Date  | null;
    updated_at: Date | null;

    [key: string]: any;

}
