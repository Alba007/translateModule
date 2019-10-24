import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from '../models/role';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  public configUrl: string = environment.domain + '/api/v1';

  constructor(
    private http: HttpClient
  ) { }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.configUrl}` + '/role/all');
    // .pipe(
    // retry(3), // retry a failed request up to 3 times
    // catchError(this.handleError) // then handle the error
    // );
  }

  addSystemRole(roles: Role[]): Observable<Role> {
    console.log(roles);
    
    return this.http
      .post<Role>(`${this.configUrl}/role`, roles);
    // .pipe(
    //   retry(3),
    // catchError(this.handleError) // then handle the error
    // );
  }

  addApplicationRole(roles: any): Observable<any> {
    console.log(roles);

    return this.http
      .post<any>(`${this.configUrl}/applications/saveRoles`, roles);
    // .pipe(
    //   retry(3),
    // catchError(this.handleError) // then handle the error
    // );
  }

  getSystemRoleList(): Observable<any> {
    return this.http.get(`${this.configUrl}/role/systemRoles`);
  }

  getAppsRoleList(): Observable<any> {
    // let url = `  http://localhost:8082/api/v1/applications/roles`;
    return this.http.get(`${this.configUrl}/applications/roles`);
  }
  // deleteRole(id: string): Observable<Role> {
  //   const url = `${this.configUrl}/api/roles/${id}`;
  //   return this.http.delete<Role>(url);
  //   // .pipe(
  //   // retry(3)
  //   //   catchError(this.handleError('deleteHero'))
  //   // );
  // }

  deleteRole(id: string): Observable<any> {
    const url = `${this.configUrl}/role/${id}`;
    return this.http.delete<any>(url);
    // .pipe(
    // retry(3)
    //   catchError(this.handleError('deleteHero'))
    // );
  }
}
