import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { PwndService } from '../services/pwnd.service';
import { MatDialog, MatDialogRef, MatDialogConfig, MatTable } from '@angular/material';
import { CreateAccountComponent } from './create-account/create-account.component';
import { Observable, Subscription } from 'rxjs';
import { Account } from '../services/models/Account.model';
import { tap } from 'rxjs/operators';

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
    private _matDialog: MatDialog
  ) {
    this.data = this._accountService.getAccounts().valueChanges().pipe(tap((result) => {
      result.forEach(x => {
        if (!x.breaches)
          this._breachService.getAccountBreaches(x.username).subscribe((result) => { x.breaches = result; });

        if (!x.pastes)
          this._breachService.getAccountPastes(x.username).subscribe((result) => { x.pastes = result });
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

  public createAccountDialog() {
    this._matDialog.open(CreateAccountComponent, { disableClose: false, minWidth: '10vw', minHeight: '5vh' } as MatDialogConfig);
  }

  public printHiddenPassword(ele: Account) {
    let txt: string = "";

    for (let x = 0; x < ele.password.length; x++)
      txt += '*';

    return txt;
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
