import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CommentComponent } from './comment/comment.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { WorkComponent } from './work/work.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'comment/:workId', component: CommentComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'work/:workId', component: WorkComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
