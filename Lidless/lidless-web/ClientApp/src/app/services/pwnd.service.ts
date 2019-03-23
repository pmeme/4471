import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pwn } from './Pwn';
import { Breach } from './breach';

// Lidless Account Checker
const  headers = new  HttpHeaders().set("User-Agent", "Lidless Account Checker");

@Injectable()
export class PwndService {
  constructor(private http: HttpClient) { }
  accountBreachUrl = 'api/breach/breaches/';

  getAccountBreaches(account): Observable<Breach[]> {
    return this.http.get<Breach[]>(this.accountBreachUrl + account);
  }

}



