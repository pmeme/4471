import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { PwndService } from '../services/pwnd.service';
import { MatDialog, MatDialogRef, MatDialogConfig, MatTable } from '@angular/material';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ChangeAccountComponent } from './change-account/change-account.component';
import { Observable, Subscription, interval } from 'rxjs';
import { Account } from '../services/models/Account.model';
import { tap, retryWhen } from 'rxjs/operators';
import { EncryptService } from '../services/encrypt.service';

@Component({
  selector: 'account-manager',
  templateUrl: './account-manager.component.html',
  styleUrls: ['./account-manager.component.scss']
})
export class AccountManagerComponent implements OnInit, AfterViewInit {
  @ViewChild(MatTable) table: MatTable<Account>;
  displayedColumns: string[] = ['host', 'username', 'password', 'actions', 'breaches'];
  data: Observable<Account[]>

  constructor(
    private _accountService: AccountService,
    private _breachService: PwndService,
    private _matDialog: MatDialog,
    private _encryptService: EncryptService
  ) {
    this.data = this._accountService.getAccounts().valueChanges().pipe(tap((result) => {
      result.forEach(x => {
        x.password = this._encryptService.decrypt(x.password);
        if (!x.breaches)
          this._breachService.getAccountBreaches(x).pipe(retryWhen((err) => interval(10000) )).subscribe((result) => { x.breaches = result; });

        if (!x.pastes)
          this._breachService.getAccountPastes(x.username).pipe(retryWhen((err) => interval(10000))).subscribe((result) => { x.pastes = result });
      });
    }));
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }

  public deleteAccount(account: Account) {
    this._accountService.deleteAccount(account).subscribe((result) => {
    });
  }

  public changeAccount(account: Account) {
    let ref = this._matDialog.open(ChangeAccountComponent, { disableClose: false, minWidth: '10vw', minHeight: '5vh' } as MatDialogConfig);
    ref.componentInstance.username = account.username;
    ref.componentInstance.host = account.host;
    ref.componentInstance.oldPassword = account.password;
    ref.componentInstance.acc = account;
  }

  public copyPass(account: Account) {
    this.copyToClipboard(account.password);
  }

  private copyToClipboard(text: string){
    let selBox: HTMLTextAreaElement = document.createElement('textarea');
    selBox.style.opacity = '0';
    selBox.value = text;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  } 

  public createAccountDialog() {
    this._matDialog.open(CreateAccountComponent, { disableClose: false, width: '300px' } as MatDialogConfig);
  }

  public printHiddenPassword(ele: Account) {
    /*
    let txt: string = "";

    for (let x = 0; x < ele.password.length; x++)
      txt += '*';

    return txt;
    */
   return "********"; //Display fixed length string to avoid exposing unnecessary information about password.
  }

  public isAccountSevereStatus(account: Account) {
    if (account.breaches)
      account.breaches.forEach(x => {
        if (x.dataClasses && x.dataClasses.findIndex(y => y === 'Passwords') != -1)
          return true;
      });

    return false;
  }
}
