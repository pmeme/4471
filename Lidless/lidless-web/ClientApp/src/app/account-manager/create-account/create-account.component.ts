import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Account } from '../../../app/services/models/Account.model';
import { AccountService } from '../../services/account.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  form: FormGroup;
  error: string;
  isLoading: boolean = false;

  constructor(
    private _matDialogRef: MatDialogRef<CreateAccountComponent>,
    private _accountService: AccountService,
  ) {
    this.setUpFormGroup();
  }

  ngOnInit() {
  }


  private setUpFormGroup(): void {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      host: new FormControl(null, [Validators.required])
    });

    this.form.valueChanges.subscribe((r) => {
      this.error = "";
    });
  }

  createAccount() {
    this.isLoading = true;
    let account: Account = {
      username: this.form.controls.username.value,
      host: this.form.controls.host.value,
      password: this.form.controls.password.value
    };

    this._accountService.createAccount(account).subscribe((result) => {
      this.isLoading = false;
      this._matDialogRef.close(true);
    });
  }

  cancel() {
    console.log('close');
    this._matDialogRef.close(false);
  }
}
