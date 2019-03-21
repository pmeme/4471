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
import { environment } from 'src/environments/environment';
import { MatDialogModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatProgressSpinnerModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';
import { AuthenticationService } from './authentication.service';
import { HomeComponent } from './home/home.component';
import { AccountManagerComponent } from './account-manager/account-manager.component';
import { NavModule } from './nav/nav.module';
import { SettingsComponent } from './settings/settings.component';
import { FileManagerComponent } from './file-manager/file-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    AccountManagerComponent,
    SettingsComponent,
    FileManagerComponent
  ],
  imports: [
    BrowserModule,
    NavModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [
    AuthenticationService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
