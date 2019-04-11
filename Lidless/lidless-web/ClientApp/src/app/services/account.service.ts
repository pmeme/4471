import { Injectable } from '@angular/core';
import { Account } from './models/Account.model';
import { Observable, of, from } from 'rxjs';
import { FirebaseStorage } from '@angular/fire';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthenticationService } from './authentication.service';
import { EncryptService } from './encrypt.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private _fireStore: AngularFirestore,
    private _authService: AuthenticationService,
    private _encryptService: EncryptService
  ) {

  }


  public createAccount(account: Account): Observable<void> {
    account.id = this._fireStore.createId();
    var pass = account.password;
    account.password = this._encryptService.encrypt(account.password);
    var result: Observable<void> = from(this._fireStore.collection(`${this._authService.user.user.uid}`).doc(account.id).set(account));
    account.password = pass;
    return result;
  }

  public changePassword(account: Account, newPassword: string): Observable<void> {
    account.password = newPassword;
    account.updatedDate = Date.now().toString();
    newPassword = this._encryptService.encrypt(newPassword);
    return from(this._fireStore.collection(`${this._authService.user.user.uid}`).doc(account.id).update({ password: newPassword }));
  }

  public deleteAccount(account: Account): Observable<void> {
    return from(this._fireStore.collection(`${this._authService.user.user.uid}`).doc(account.id).delete());
  }

  public getAccount(id: string): Observable<firebase.firestore.DocumentSnapshot> {
    return from(this._fireStore.collection(`${this._authService.user.user.uid}`).doc(id).get());
    

  }

  public getAccounts(): AngularFirestoreCollection<Account> {
    return this._fireStore.collection<Account>(`${this._authService.user.user.uid}`);
  }
}
