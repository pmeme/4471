import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { PwndService } from '../services/pwnd.service';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { CreateAccountComponent } from './create-account/create-account.component';
import { Observable, Subscription } from 'rxjs';
import { Account } from '../services/models/Account.model';

@Component({
  selector: 'account-manager',
  templateUrl: './account-manager.component.html',
  styleUrls: ['./account-manager.component.scss']
})
export class AccountManagerComponent implements OnInit {
  displayedColumns: string[] = ['host', 'username', 'password','actions'];
  data: Observable<Account[]>

  constructor(
    private _accountService: AccountService,
    private _breachService: PwndService,
    private _matDialog: MatDialog
  ) {
    this.data = this._accountService.getAccounts().valueChanges();
  }

  ngOnInit() {
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
}
