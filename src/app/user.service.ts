import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';

interface MyData {
  message: string;
  success: boolean;
}

interface IsLoggedIn {
  status: boolean;
}

interface LogoutStatus {
  success: boolean;
}
@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  getSomeData() {
    return this.http.get<MyData>('/api/database');
  }

  isLoggedIn(): Observable<IsLoggedIn> {
    return this.http.get<IsLoggedIn>('/api/isloggedin');
  }

  logout() {
    return this.http.get<LogoutStatus>('/api/logout');
  }

}
