import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { AccountManagerComponent } from './account-manager/account-manager.component';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    component: LoginComponent,
    path: 'login'
  },
  {
    path: 'accounts',
    component: AccountManagerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'files',
    component: FileManagerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**', redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: "ignore",
    useHash: true
  } as ExtraOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
