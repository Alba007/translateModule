export interface Transit {

    plate: string;
    lane: string;
    numread: string;
    time: string;
    country: string;
    vehicle_class: string;
    gantryID: string;
    OBUID: string;
    obuType: string;
    date: number;
    ocr_score: number;
    plate_and_country: string;
    plate_not_read: boolean;
    vehicle_direction: string;
    vehicle_speed: number;
    vehicle_color: string;
    traffic_status: number;
    traffic_alarm: boolean;
    mean_transit: number;
    total_transit: number;
    radar_speed_kmh: number;
    gps_data: string;
}
