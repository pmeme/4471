import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Account } from '../../../app/services/models/Account.model';
import { AccountService } from '../../services/account.service';
import { Observable } from 'rxjs';
import { ToolService } from '../../services/tool.service';

@Component({
  selector: 'change-account',
  templateUrl: './change-account.component.html',
  styleUrls: ['./change-account.component.scss']
})
export class ChangeAccountComponent implements OnInit {
  @ViewChild('passwordField', { read: ElementRef })
  passwordField: ElementRef;

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
    private _toolService: ToolService
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

  toggleShowPassword() {
    this.passwordField.nativeElement.type == 'password' ?
      this.passwordField.nativeElement.type = 'text' : this.passwordField.nativeElement.type = 'password';
  }

  generatePassword() {
    this._toolService.generatePassword().subscribe((result) => {
      console.log(result);
      this.form.get('password').setValue(result);
    });
  }

  cancel() {
    this._matDialogRef.close(false);
  }
}
