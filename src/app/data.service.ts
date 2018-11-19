import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';


interface MyData {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get('https://reqres.in/api/users');
  }

  createNewGame(deck1, deck2) {
    // post these details to API server return user info if correct
    return this.http.post<MyData>('/api/NewGame', {
      deck1,
      deck2
    });
  }

  createNewDeck(name, decklist) {
    // post these details to API server return user info if correct
    return this.http.post<MyData>('/api/NewDeck', {
      name,
      decklist
    });
  }
}
