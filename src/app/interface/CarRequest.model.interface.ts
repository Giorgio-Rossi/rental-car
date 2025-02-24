export interface CarRequest {
    id: number;
    user_id: number;
    car_id: number[];
    status: string;
    start_reservation: Date | null;
    end_reservation: Date | null;
    created_at: Date;
    updated_at: Date;
}
