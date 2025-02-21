export interface Reservation {
    id: number;
    user_id: number;
    car_id: number[];
    status: string;
    start_reservation: Date;
    end_reservation: Date;
    created_at: Date;
    updated_at: Date;
}
