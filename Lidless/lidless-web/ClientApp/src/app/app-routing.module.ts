import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    component: LoginComponent,
    path: 'login'
  },
  {
    path: '',
    pathMatch: 'full',
    component: AppComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
