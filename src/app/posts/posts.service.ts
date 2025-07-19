import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ipost } from '../shared/model/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  POST_URL:string=`${environment.BaseUrl}/posts.json`
  private RemovePostSub$:Subject<string>=new Subject<string>()

  get removePostAsobs():Observable<string>{
    return this.RemovePostSub$.asObservable()
  }
  emitRomovepost(id:string){
    this.RemovePostSub$.next(id)
  }
  constructor(
    private _http:HttpClient
  ) { }

  fetchAllPost():Observable<any>{
  return  this._http.get(this.POST_URL)
    .pipe(
      map((data:any)=>{
        let postArr:Array<any>=[]
        for (const key in data) {
          postArr.push({...data[key],id:key})
        }
        return postArr
      })
    )
  }

  AddPost(post:Ipost):Observable<any>{
   return this._http.post<any>(this.POST_URL,post)
  }

  postUpdate(post:Ipost){
    let UPDATE_URL=`${environment.BaseUrl}/posts/${post.id}/.json`
    return this._http.patch(UPDATE_URL,post)
  }

  RemovePost(post:Ipost):Observable<any>{
    let REMOVE_URL=`${environment.BaseUrl}/posts/${post.id}/.json`
     return this._http.delete<null>(REMOVE_URL)

  }
}
