import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { MatDialogModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatProgressSpinnerModule, MatToolbarModule, MatTableModule, MatIconModule, MatMenuModule, MatSlideToggleModule, MatCheckboxModule, MatTooltipModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { AccountManagerComponent } from './account-manager/account-manager.component';
import { NavModule } from './nav/nav.module';
import { SettingsComponent } from './settings/settings.component';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { environment } from '../environments/environment';
import { WebviewDirective } from './directives/webview.directive';
import { ElectronService } from './providers/electron.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PwndService } from './services/pwnd.service';
import { AuthenticationService } from './services/authentication.service';
import { CreateAccountComponent } from './account-manager/create-account/create-account.component';
import { ChangeAccountComponent } from './account-manager/change-account/change-account.component';
import { ViewBreachesComponent } from './account-manager/view-breaches/view-breaches.component';
import { SanitizePipe } from './pipes/sanitize.pipe';
import { ChromePopupComponent } from './chrome-popup/chrome-popup.component';
import { NotificationService } from './services/notifications/notification.service';
import { ChromeNotificationService } from './services/notifications/impl/notifications.chrome';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    AccountManagerComponent,
    SettingsComponent,
    HeaderComponent,
    FileManagerComponent,
    WebviewDirective,
    CreateAccountComponent,
    ChangeAccountComponent,
    ViewBreachesComponent,
    SanitizePipe,
    ChromePopupComponent
  ],
  imports: [
    BrowserModule,
    NavModule,
    MatIconModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatTooltipModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatInputModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatTableModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatButtonModule,
    HttpClientModule,
    MatDialogModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [
    AuthenticationService,
    ElectronService,
    { provide: NotificationService, useClass: ChromeNotificationService },
    AuthGuard,
    PwndService
  ],
  entryComponents: [
    CreateAccountComponent,
    ChangeAccountComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
