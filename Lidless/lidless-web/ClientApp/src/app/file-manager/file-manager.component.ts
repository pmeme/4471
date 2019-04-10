import { Component, OnInit } from '@angular/core';
import { Account } from '../services/models/Account.model';
import { NotificationService } from '../services/notifications/notification.service';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss']
})
export class FileManagerComponent implements OnInit {
  public accounts: Account[];

  constructor(
    private _notificationService: NotificationService,
    private _accountService: AccountService,
    private _router: Router
  ) {
    this._accountService.getAccounts().valueChanges().subscribe((result) => {
      this.accounts = result;
    });
  }

  ngOnInit() {
  }

  createInfoNotification(account: Account) {
    let date = new Date();
    date.setDate(date.getDate() + 3);
    let options: chrome.notifications.NotificationOptions = {
      message: `Account: ${account.username} is set to expire on ${date.toString()}`,
      title: 'Password Expiration Notice',
      type: 'basic',
      iconUrl: 'favicon.ico'
    };

    this._notificationService.generateNotification(options);
  }

  createWarnNotification(account: Account) {
    let options: chrome.notifications.NotificationOptions = {
      message: `Account: ${account.username} has been compromised. Change your password immediately`,
      title: 'Account Compromised',
      type: 'basic',
      iconUrl: 'favicon.ico',
      priority: 2,
      isClickable: true,
      requireInteraction: true
    };

    this._notificationService.generateNotification(options, (id) => {
      let callback = (notificationId, byUser) => {
        if (id === notificationId)
          this._router.navigateByUrl(`breaches/${account.id}`);

        chrome.notifications.onClosed.removeListener(callback);
      };
      chrome.notifications.onClosed.addListener(callback);
    });
  }

  createWarnMultipleNotification() {
    let options: chrome.notifications.NotificationOptions = {
      message: `The following accounts have been marked as compromised.`,
      items: [{ title: this.accounts[0].username, message: '$$$$' }, { title: this.accounts[1].username, message: '$$$$' }],
      title: 'Accounts Compromised',
      type: 'list',
      priority: 2,
      isClickable: true,
      requireInteraction: true,
      iconUrl: 'favicon.ico'
    };

    this._notificationService.generateNotification(options);
  }
}
