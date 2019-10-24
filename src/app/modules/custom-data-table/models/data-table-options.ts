export interface DataTableOptions {
    title: string;
    dynamicColumns: string[];
    secondaryDynamicColumns?: string[];
    showSecondaryDynamicColumns?: boolean;
    actions: string[];
    showActions: boolean;
    rowActions?: Actions[];
    tableActions?: Actions[];
    multipleActions?: Actions[];
    select: string[];
    showSelect: boolean;
    extraDetail: string[];
    showExtraDetail: boolean;
    showSearchFilter: boolean;
    searchFilters: Filter[];
    paginatorOptions: PaginatorOptions;
    datasource: any[];
}

interface Filter {
    type?: string;
    name: string;
} 

interface Actions {
    icon: string;
    name: string;
    type?: string;
}

export interface PaginatorOptions {
    pageIndex: number;
    pageSize: number;
    pageSizeOptions: number[];
}
