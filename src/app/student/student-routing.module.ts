import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { UserRoleGuard } from '../shared/guards/user-role.guard';

const routes: Routes = [
    {
    path: '',
    component: StudentDashboardComponent,
    // canActivate: [AuthGuard,UserRoleGuard],

    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
      },
    //   {
    //     path: 'oddpost',
    //     component: ,
    //     resolve: {
    //       user: PostResolver,
    //     },
    //   },
    //   {
    //     path: 'evenpost',
    //     component: EvenpostComponent,
    //     resolve: {
    //       user: PostResolver,
    //     },
    //   },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule{}