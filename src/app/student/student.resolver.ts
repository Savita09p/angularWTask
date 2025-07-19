import { inject, Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { StudentService } from './student.service';

@Injectable({
  providedIn: 'root'
})
export class StudentResolver implements Resolve<any> {
  private _student = inject(StudentService);
    resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<Array<any> | any> {
      return this._student.fetchAllStudent();
    }
  
}
