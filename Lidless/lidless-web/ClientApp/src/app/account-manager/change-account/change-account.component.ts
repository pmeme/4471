import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Account } from '../../../app/services/models/Account.model';
import { AccountService } from '../../services/account.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'change-account',
  templateUrl: './change-account.component.html',
  styleUrls: ['./change-account.component.scss']
})
export class ChangeAccountComponent implements OnInit {
  form: FormGroup;
  error: string;
  isLoading: boolean = false;

  username: string = "userhere";
  host: string = "hosthere";
  oldPassword: string = "oldpasshere";

  acc: Account;

  constructor(
    private _matDialogRef: MatDialogRef<ChangeAccountComponent>,
    private _accountService: AccountService,
  ) {
    this.setUpFormGroup();
  }

  ngOnInit() {
  }

  private setUpFormGroup(): void {
    this.form = new FormGroup({
      password: new FormControl(null, [Validators.required])
    });

    this.form.valueChanges.subscribe((r) => {
      this.error = "";
    });
  }

  changeAccount() {
    this.isLoading = true;
    this._accountService.changePassword(this.acc, this.form.controls.password.value).subscribe((result) => {
      this.isLoading = false;
      this._matDialogRef.close(true);
    });
  }

  cancel() {
    this._matDialogRef.close(false);
  }
}
