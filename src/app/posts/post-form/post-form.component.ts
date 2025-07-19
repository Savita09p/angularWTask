import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Ipost } from 'src/app/shared/model/post';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  postForm!:FormGroup
 Isineditmode:boolean=false
 editobj!:Ipost

  constructor(
    private _dailogRef:MatDialogRef<PostFormComponent>,
    private matDialigRef : MatDialogRef<PostFormComponent>,
    @Inject(MAT_DIALOG_DATA) getdata:any,
    private _postService:PostsService
  ) {
    console.log(getdata);
    this.createPostForm()
    if(getdata){
      this.Isineditmode=true
      this.editobj=getdata
      this.postForm.patchValue(getdata)
    }else{
      this.Isineditmode=false
    }
    
   }

  ngOnInit(): void {
    // this.createPostForm()
  }

  createPostForm(){
  this.postForm=new FormGroup({
    title:new FormControl(null,[Validators.required]),
    content:new FormControl(null,[Validators.required]),
    UserId:new FormControl(null,[Validators.required]),
  })
  }


  onAddPost(){
    // console.log(this.postForm.valid);
    
    if(this.postForm.valid){
      if(!this.Isineditmode){
        console.log(this.postForm.value);
      let postObj:Ipost=this.postForm.value
      this.postForm.reset()
      console.log(postObj);
      this._postService.AddPost(postObj)
          .subscribe(res=>{
            console.log(res);
            this._dailogRef.close({...postObj,Id:res.name})
          })
      }else{//udatedtObj 
        let updateObj={...this.postForm.value,id:this.editobj.id}
        console.log(updateObj);
        this._postService.postUpdate(updateObj)
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
