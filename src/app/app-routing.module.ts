import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { UserRoleGuard } from './shared/guards/user-role.guard';
import { AuthComponent } from './shared/components/auth/auth.component';

const routes: Routes = [
  {
    path:'',
    component:AuthComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard,UserRoleGuard],
    data: {
      userRole: ['buyer', 'admin', 'superadmin'],
    },
  },
  {
    path: 'post',
    loadChildren: () =>
      import('./posts/posts.module').then((res) => res.PostModule),
  },
  {
    path: 'student',
    loadChildren: () =>
       import('./student/student.module').then((res) => res.StudentModule),
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
