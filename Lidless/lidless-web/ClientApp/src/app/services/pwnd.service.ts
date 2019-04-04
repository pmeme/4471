import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Breach } from './models/breach';
import { Paste } from './models/Paste';
import { AccountService } from './account.service';
import { map } from 'rxjs/operators';
import { Account } from './models/Account.model';

@Injectable()
export class PwndService {
  accountBreachUrl = 'https://localhost:44363/api/breach';

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) { }

  getAccountBreaches(account: Account): Observable<Breach[]> {
    if (account.domainRestricted)
      return this.http.get<Breach[]>(`${this.accountBreachUrl}/breaches/${encodeURI(account.username)}/${account.host}`);
    else
      return this.http.get<Breach[]>(`${this.accountBreachUrl}/breaches/${encodeURI(account.username)}`);
  }

  getAccountPastes(account: string): Observable<Paste[]> {
    return this.http.get<Paste[]>(`${this.accountBreachUrl}/pastes/${encodeURI(account)}`);
  }
}



