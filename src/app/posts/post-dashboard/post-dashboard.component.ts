import { Component, OnInit } from '@angular/core';
import { PostFormComponent } from '../post-form/post-form.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Ipost } from 'src/app/shared/model/post';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.scss']
})
export class PostDashboardComponent implements OnInit {

  postArr: Array<Ipost> = [];
  constructor(private _postservice: PostsService, private _dailog: MatDialog) {}

  ngOnInit(): void {
    this._postservice.fetchAllPost().subscribe((res: Ipost[]) => {
      console.log(res);
      this.postArr = res;
    });

    this._postservice.removePostAsobs.subscribe((res: any) => {
      let getindex = this.postArr.findIndex((post) => {
        post.id === res;
      });
      this.postArr.splice(getindex, 1);
    });
  }

  onAddPost() {
    let dialogConfig = new MatDialogConfig();

    // Example of customizing the dialog
    dialogConfig.width = '600px';
    // dialogConfig.height = '400px';
    dialogConfig.disableClose = true;

    console.log(dialogConfig);

    let dailogRef = this._dailog.open(PostFormComponent, dialogConfig);

    dailogRef.afterClosed().subscribe((res: any) => {
      console.log(res);
      this.postArr.push(res);
    });
  }
  

}
