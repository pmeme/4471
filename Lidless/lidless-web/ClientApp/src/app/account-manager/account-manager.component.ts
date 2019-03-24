import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { PwndService } from '../services/pwnd.service';

@Component({
  selector: 'account-manager',
  templateUrl: './account-manager.component.html',
  styleUrls: ['./account-manager.component.scss']
})
export class AccountManagerComponent implements OnInit {
  displayedColumns: string[] = ['host', 'username', 'password', 'breaches', 'actions'];

  constructor(
    private _accountService: AccountService,
    private _breachService: PwndService
  ) {
    this._breachService.getAccountBreaches("helloworld@gmail.com").subscribe((result) => {
      console.log(result);
    });
  }

  ngOnInit() {
  }

  public deleteAccount(account: Account) {

  }

  public createAccount(account: Account) {

  }

  public getAccounts() {

  }
}
