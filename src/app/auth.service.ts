import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface MyData {
  success: boolean;
  message: string;
}

interface RegisterResponse {
  success: boolean;
}

@Injectable()
export class AuthService {

  private loggedInStatus = false;
  constructor(private http: HttpClient) { }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
  }

  get isLoggedIn() {
    return this.loggedInStatus;
  }

  getUserDetails(username, password) {
    // post these details to API server return user info if correct
    return this.http.post<MyData>('/api/login', {
      username,
      password
    });
  }
  registerUser(username, password, cpassword) {
    return this.http.post<MyData>('/api/register', {
      username,
      password,
      cpassword
    });
  }

}
