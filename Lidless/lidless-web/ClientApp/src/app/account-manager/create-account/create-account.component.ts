import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Account } from '../../../app/services/models/Account.model';
import { AccountService } from '../../services/account.service';
import { Observable } from 'rxjs';
import { ToolService } from '../../services/tool.service';

@Component({
  selector: 'create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  @ViewChild('passwordField', { read: ElementRef })
  passwordField: ElementRef;

  form: FormGroup;
  error: string;
  isLoading: boolean = false;

  constructor(
    private _matDialogRef: MatDialogRef<CreateAccountComponent>,
    private _accountService: AccountService,
    private _toolService: ToolService
  ) {
    this.setUpFormGroup();
  }

  ngOnInit() {
  }

  private setUpFormGroup(): void {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      host: new FormControl(null, [Validators.required]),
      domainRestricted: new FormControl(true)
    });

    this.form.valueChanges.subscribe((r) => {
      this.error = "";
    });

    this.form.get('domainRestricted').valueChanges.subscribe((result) => {
      var hostControl = this.form.get('host');

      if (!result) {
        hostControl.disable();
        hostControl.setValidators(null);
      } else {
        hostControl.enable();
        hostControl.setValidators(Validators.required)
      }

    });
  }

  createAccount() {
    this.isLoading = true;
    let account: Account = {
      username: this.form.controls.username.value,
      host: this.form.controls.host.value,
      password: this.form.controls.password.value,
      domainRestricted: this.form.get('domainRestricted').value
    };

    this._accountService.createAccount(account).subscribe((result) => {
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
