import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AutoConfigRequest {
    
    private _httpClient: HttpClient;
    
    constructor(handler: HttpBackend) {
        this._httpClient = new HttpClient(handler);
    }

    public makeRequestToOutside(url: string): Observable<any>  {
        // console.log(url);
        return this._httpClient.get<any>(`${url}`);
    }

}