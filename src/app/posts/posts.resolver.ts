import { inject, Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { PostsService } from './posts.service';

@Injectable({
  providedIn: 'root'
})
export class PostsResolver implements Resolve<any> {
  private _post = inject(PostsService);
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Array<any> | any> {
    return this._post.fetchAllPost();
  }
  
}
