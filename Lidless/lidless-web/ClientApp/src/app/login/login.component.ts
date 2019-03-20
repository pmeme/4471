import { Component, TemplateRef, ViewChild, AfterViewInit, ViewContainerRef } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { AuthenticationService } from '../authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TemplatePortal } from '@angular/cdk/portal';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('loginTemplate', { read: TemplateRef }) private _loginTemplate: TemplateRef<any>;
  
  form: FormGroup;
  isLoading: boolean = false;
  error: string = "";
  matDialogRef: MatDialogRef<TemplateRef<any>>;

  constructor(
    private _authService: AuthenticationService,
    private _viewContainerRef: ViewContainerRef,
    private _matDialog: MatDialog
  ) {
    this.setUpFormGroup();
  }

  private setUpFormGroup(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });

    this.form.valueChanges.subscribe((r) => {
      this.error = "";
    });
  }

  ngAfterViewInit() {
    let options = {
      disableClose: true,
      minWidth: '17em',
      minHeight: '12em'
    } as MatDialogConfig;

    this.matDialogRef = this._matDialog.open(this._loginTemplate, options);
  }

  public login(): void {
    this.isLoading = true;
    this._authService.login(this.form.controls.email.value, this.form.controls.password.value).subscribe((result) => {
      this.isLoading = false;
      this.close(true);
    }, () => { this.isLoading = false; this.error = "Failed to login" });
  }

  public register(): void {
    this.isLoading = true;
    this._authService.register(this.form.controls.email.value, this.form.controls.password.value).subscribe((result) => {
      this.isLoading = false;
      this.close(true);
    }, () => { this.isLoading = false; this.error = "Failed to register" });
  }

  public close(value: boolean) {
    this.matDialogRef.close(value);
  }

  public setTemplate(template: TemplateRef<any>): void {
    this.form.reset();
    this.error = "";
    let portal = new TemplatePortal(template, this._viewContainerRef);
    this.matDialogRef._containerInstance._portalOutlet.attachedRef.destroy();
    this.matDialogRef._containerInstance._portalOutlet.attachTemplatePortal(portal);
  }
}
