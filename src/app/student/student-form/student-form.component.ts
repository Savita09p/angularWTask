import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Istudent } from 'src/app/shared/model/student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

   studentForm!:FormGroup
   Isineditmode:boolean=false
   editobj!:Istudent
  
    constructor(
      private _dailogRef:MatDialogRef<StudentFormComponent>,
      private matDialigRef : MatDialogRef<StudentFormComponent>,
      @Inject(MAT_DIALOG_DATA) getdata:any,
      private _studentService:StudentService
    ) {
      console.log(getdata);
      this.createStudentForm()
      if(getdata){
        this.Isineditmode=true
        this.editobj=getdata
        this.studentForm.patchValue(getdata)
      }else{
        this.Isineditmode=false
      }
      
     }
  
    ngOnInit(): void {
      // this.createPostForm()
    }
  
    createStudentForm(){
    this.studentForm=new FormGroup({
      fname:new FormControl(null,[Validators.required]),
      lname:new FormControl(null,[Validators.required]),
      email:new FormControl(null,[Validators.required]),
      contact:new FormControl(null,[Validators.required])
    })
    }
  
  
    onAddStudent(){
      // console.log(this.postForm.valid);
      
      if(this.studentForm.valid){
        if(!this.Isineditmode){
          console.log(this.studentForm.value);
        let postObj:Istudent=this.studentForm.value
        this.studentForm.reset()
        console.log(postObj);
        this._studentService.AddStudent(postObj)
            .subscribe(res=>{
              console.log(res);
              this._dailogRef.close({...postObj,Id:res.name})
            })
        }else{//udatedtObj 
          let updateObj={...this.studentForm.value,id:this.editobj.id}
          console.log(updateObj);
          this._studentService.studentUpdate(updateObj)
             .subscribe(res=>{
              console.log(res);
              this._dailogRef.close(res) 
             }
             )
        
        }

      }
    }
  
    onClose(){
      this.matDialigRef.close()
    }
  

}
