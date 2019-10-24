export interface Filter {
    type: string;
    filters?: string[];
    pageIndex?: number;
    pageLength?: number;
    pageSize?: number;
    sortBy?: string;
    sortDirection?: string;
}
