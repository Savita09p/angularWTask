import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentTableComponent } from './student-table/student-table.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { StudentRoutingModule } from './student-routing.module';
import { MatIconModule } from "@angular/material/icon";
import { MaterialModule } from '../shared/material/material.module';
import { HttpClientJsonpModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [StudentDashboardComponent,StudentTableComponent,StudentFormComponent],
  imports: [
    CommonModule, StudentRoutingModule,
    MatIconModule,
    MaterialModule,
    HttpClientJsonpModule,
    ReactiveFormsModule
]
})
export class StudentModule {
    constructor() {
    console.log('Student module loaded');
  }
 }