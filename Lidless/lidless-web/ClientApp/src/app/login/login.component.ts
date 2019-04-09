import { Component, TemplateRef, ViewChild, AfterViewInit, ViewContainerRef } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TemplatePortal } from '@angular/cdk/portal';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

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

  private _redirectUrl: string;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthenticationService,
    private _router: Router,
    private _viewContainerRef: ViewContainerRef,
    private _matDialog: MatDialog
  ) {
    _activatedRoute.queryParamMap.subscribe((result: ParamMap) => {
      this._redirectUrl = result.get("redirect");
    });
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
      minWidth: '17rem',
      minHeight: '12rem'
    } as MatDialogConfig;

    this.matDialogRef = this._matDialog.open(this._loginTemplate, options);
  }

  public login(): void {
    this.isLoading = true;
    this._authService.login(this.form.controls.email.value, this.form.controls.password.value).subscribe((result) => {
      this._navigate();
    }, () => { this.isLoading = false; this.error = "Failed to login" });
  }

  public register(): void {
    this.isLoading = true;
    this._authService.register(this.form.controls.email.value, this.form.controls.password.value).subscribe((result) => {
      this._navigate();
    }, () => { this.isLoading = false; this.error = "Failed to register" });
  }

  private _navigate() {
    this.isLoading = false;
    this.close(true);
    if (!this._redirectUrl)
      this._redirectUrl = '';

    this._router.navigate([this._redirectUrl]);
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
