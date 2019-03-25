import { Injectable } from '@angular/core';
import { Account } from './models/Account.model';
import { Observable, of, from } from 'rxjs';
import { FirebaseStorage } from '@angular/fire';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private _fireStore: AngularFirestore,
    private _authService: AuthenticationService
  ) {

  }


  public createAccount(account: Account): Observable<void> {
    account.id = this._fireStore.createId();

   return from(this._fireStore.collection(`${this._authService.user.user.uid}`).doc(account.id).set(account));
  }

  public deleteAccount(account: Account): Observable<void> {
    return from(this._fireStore.collection(`${this._authService.user.user.uid}`).doc(account.id).delete());
  }

  public getAccounts(): AngularFirestoreCollection<Account> {
    return this._fireStore.collection<Account>(`${this._authService.user.user.uid}`);
  }
}
