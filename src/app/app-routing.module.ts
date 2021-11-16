import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [
  { path: 'register', component: SignUpComponent },
  { path: 'login', component: SignInComponent },
  { path: 'artist/dashboard', component: SignUpComponent },
  { path: 'user/dashboard', component: SignInComponent },
  { path: '**', component: SignInComponent }
  // {path: '/register', loadChildren: () => import('./sign-up/sign-up.module').then(m => m.SignUpModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
