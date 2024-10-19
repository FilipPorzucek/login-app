import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'console';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../interface/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl="http://localhost:3000"

  constructor(private http:HttpClient) { }

  register(userDetails: User){
    return this.http.post(`${this.apiUrl}/users`, userDetails);
  }
  login(email: string):Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}/users?email=${email}`);
  }

  }


