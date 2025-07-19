import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { StudentFormComponent } from '../student-form/student-form.component';
import { Istudent } from 'src/app/shared/model/student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {
  @Input()student:any
  studentArr: Array<Istudent> = [];
  // student !:Istudent
  constructor(
    private _studentService : StudentService,
    private _dailog: MatDialog
  ) { }

  ngOnInit(): void {
    this._studentService.fetchAllStudent().subscribe((res: Istudent[]) => {
          console.log(res);
          this.studentArr = res;
        });
    
        this._studentService.removeStudentAsobs.subscribe((res: any) => {
          let getindex = this.studentArr.findIndex((post) => {
            post.id === res;
          });
          this.studentArr.splice(getindex, 1);
        });
  }

  onAddStudent(){
    let dialogConfig = new MatDialogConfig();
     dialogConfig.width = '600px';
     dialogConfig.disableClose = true;
     console.log(dialogConfig);
     let dailogRef = this._dailog.open(StudentFormComponent, dialogConfig);
     dailogRef.afterClosed().subscribe((res: any) => {
          console.log(res);
          this.studentArr.push(res);
        });
  }
}
