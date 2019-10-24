import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public configUrl: string = environment.domain + '/api/v1/users';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  // getUsers(): Observable<User[]> {
  //   return this.http.get<User[]>('http://localhost:8080/user/list?page=0&size=10')
  // }

  getUser(): Observable<User[]> {
    return this.http.get<User[]>(`${this.configUrl}/allUsers`);
  }

  addUser(user: User): Observable<User> {
    console.log(user);
    
    return this.http.post<User>(`${this.configUrl}/register`, user);
  }

  editUser(user: User): Observable<User> {
    console.log('edit user', user);
    
    return this.http.put<User>(`${this.configUrl}`, user);
  } 

  resetPassword(password): Observable<any> {
    console.log(password);
    
    return this.http.post<any>(`${this.configUrl}/changePass`, password)
  }

  // deleteUser(id: string): Observable<User> {
  //   const url = `${this.configUrl}/${id}`;
  //   return this.http.delete<User>(url);
  //   // .pipe(
  //   // retry(3)
  //   //   catchError(this.handleError('deleteHero'))
  //   // );
  // }

  // editUser(user) {
  //   return this.http.put(this.configUrl, user)
  // }

  // updateUser(user): Observable<User> {
  //   const url = `${this.configUrl}/${user.id}`;
  //   return this.http.put<User>(url, user.id)
  // }

  // deleteUser(user) {
  //   return this.http.put(this.configUrl, user)
  // }



}
