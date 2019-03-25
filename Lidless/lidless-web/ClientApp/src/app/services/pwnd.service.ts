import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Breach } from './models/breach';
import { Paste } from './models/Paste';

@Injectable()
export class PwndService {
  accountBreachUrl = 'https://localhost:44363/api/breach';

  constructor(private http: HttpClient) { }

  getAccountBreaches(account: string): Observable<Breach[]> {
    return this.http.get<Breach[]>(`${this.accountBreachUrl}/breaches/${encodeURI(account)}`);
  }

  getAccountPastes(account: string): Observable<Paste[]> {
    return this.http.get<Paste[]>(`${this.accountBreachUrl}/pastes/${encodeURI(account)}`);
  }
}



