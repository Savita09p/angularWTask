
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { PostFormComponent } from './post-form/post-form.component';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from '@angular/forms';
import { PostDashboardComponent } from './post-dashboard/post-dashboard.component';
import { PostCardComponent } from './post-card/post-card.component';
import { PostRoutingModule } from './posts-routing.module';
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatDividerModule } from "@angular/material/divider";
import { MaterialModule } from '../shared/material/material.module';



@NgModule({
  declarations: [PostDashboardComponent, PostCardComponent,PostFormComponent],
  imports: [
    CommonModule, PostRoutingModule,
    MaterialModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDividerModule
]
})
export class PostModule {
    constructor() {
    console.log('Post module loaded');
  }
 }
