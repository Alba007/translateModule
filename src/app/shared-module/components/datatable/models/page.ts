
export interface Page<T> {
 content: T[],
 pageable: Pageable,
 totalPages: number,
 totalElements: number,
 last: boolean,
 first: boolean,
 sort: Sort,
 numberOfElements: number,
 size: number,
 number: number,
 empty: boolean

}

export interface Pageable {
    sort: Sort,
    pageSize: number,
    pageNumber: number,
    offset: number,
    paged: number,
    unpaged: number
}

export interface Sort {
    unsorted: boolean,
    sorted: boolean,
    empty: boolean
}

