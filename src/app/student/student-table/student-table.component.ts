import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Istudent } from 'src/app/shared/model/student';
import { StudentService } from '../student.service';
import { StudentFormComponent } from '../student-form/student-form.component';
import { GetConfirmComponent } from 'src/app/shared/components/get-confirm/get-confirm.component';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.scss']
})
export class StudentTableComponent implements OnInit {
  @Input()student:any
  id!:string;
  studentArr !: Array<Istudent> 
  studentObj!: Istudent
  constructor(
    private _matDailog:MatDialog,
    private _studentService : StudentService
  ) { }

  ngOnInit(): void {
    this._studentService.fetchAllStudent().subscribe((res: Istudent[]) => {
          // console.log(res);
          this.studentArr = res;
        });
  }

  onEdit(){
      let dialogConfig=new MatDialogConfig()
      dialogConfig.width='600px',
      dialogConfig.data=this.student
      dialogConfig.disableClose=true
  
      let dailogref=this._matDailog.open(StudentFormComponent,dialogConfig)
      dailogref.afterClosed().subscribe((res: any)=>{
        this.studentObj = {...res, id : this.id};
        this.student=res})
  
      
    }
  
    onRemove(){
      let dailogconfig=new MatDialogConfig()
      dailogconfig.width='300px'
     let dailogref= this._matDailog.open(GetConfirmComponent,dailogconfig)
  
     dailogref.afterClosed()
     .subscribe((res: any)=>{
      console.log(res);
      if(res){
        //API CALL >>remove
        this._studentService.RemoveStudent(this.student)
          .subscribe((res: any)=>{
            console.log(res);
            this._studentService.emitRomovestudent(this.student.id)
            
          })
      }
      
     })
    }
}
