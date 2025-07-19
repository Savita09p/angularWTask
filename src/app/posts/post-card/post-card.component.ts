import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from 'src/app/shared/components/get-confirm/get-confirm.component';
import { PostFormComponent } from '../post-form/post-form.component';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  @Input()post:any
  constructor(
    private _postservise:PostsService,
    private _matDailog:MatDialog
  ) { }

  ngOnInit(): void {
  }


  onedit(){
    let dialogConfig=new MatDialogConfig()
    dialogConfig.width='600px',
    dialogConfig.data=this.post
    dialogConfig.disableClose=true

    let dailogref=this._matDailog.open(PostFormComponent,dialogConfig)
    dailogref.afterClosed().subscribe((res: any)=>{this.post=res})

    
  }

  OnRemove(){
    let dailogconfig=new MatDialogConfig()
    dailogconfig.width='300px'
   let dailogref= this._matDailog.open(GetConfirmComponent,dailogconfig)

   dailogref.afterClosed()
   .subscribe((res: any)=>{
    console.log(res);
    if(res){
      //API CALL >>remove
      this._postservise.RemovePost(this.post)
        .subscribe((res: any)=>{
          console.log(res);
          this._postservise.emitRomovepost(this.post.id)
          
        })
    }
    
   })
  }
  

}
