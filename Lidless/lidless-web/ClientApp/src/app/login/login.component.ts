import { Component, OnInit, TemplateRef, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { AuthenticationService } from '../authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('loginTemplate', { read: TemplateRef }) private _loginTemplate: TemplateRef<any>;

  form: FormGroup; 
  loadingObserver$: Observable<any>;
  matDialogRef: MatDialogRef<TemplateRef<any>>;

  constructor(
    private _authService: AuthenticationService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _matDialog: MatDialog
  ) {
    this.setUpFormGroup();
  }

  private setUpFormGroup(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
  }

  ngAfterViewInit() {
    let options = {
      disableClose: true,
      minWidth: '20em',
      minHeight: '20em'
    } as MatDialogConfig;
    this.matDialogRef = this._matDialog.open(this._loginTemplate, options);
    this._changeDetectorRef.detectChanges();
  }

  public login() {
    this.loadingObserver$ = this._authService.login(this.form.controls.email.value, this.form.controls.password.value).pipe(tap((result) => {
      this.close(true); 
    }));
  }

  public close(value: boolean) {
    this.matDialogRef.close(value);
  }
}
