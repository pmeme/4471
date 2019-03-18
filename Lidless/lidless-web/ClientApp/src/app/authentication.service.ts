import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable, from } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _user: auth.UserCredential | null;

  public get user(): auth.UserCredential {
    return this._user;
  }

  public get isLoggedIn(): boolean {
    return !isNullOrUndefined(this._user);
  }

  constructor(
    private _fireAuth: AngularFireAuth
  ) { }

  public login(email: string, password: string): Observable<auth.UserCredential> {
    return from(this._fireAuth.auth.signInWithEmailAndPassword(email, password)).pipe(tap((user: auth.UserCredential) => {
      this._user = user;
    }));
  }

  public loginFromProvider(provider: firebase.auth.AuthProvider): Observable<auth.UserCredential> {
    return from(this._fireAuth.auth.signInWithPopup(provider)).pipe(tap((user: auth.UserCredential) => {
      this._user = user;
    }));
  }

  public signUp(email: string, password: string): Observable<auth.UserCredential> {
    return from(this._fireAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(email, password)).pipe(tap((user: auth.UserCredential) => {
      this._user = user;
    }));
  }

  public logOut(): Observable<void> {
    return from(this._fireAuth.auth.signOut()).pipe(tap(() => {
      this._user = null;
    }));
  }
}
