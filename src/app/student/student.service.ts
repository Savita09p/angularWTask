import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Istudent } from '../shared/model/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  POST_STUDENTURL:string=`${environment.BaseUrl_student}/student.json`
  private RemoveStudentSub$:Subject<string>=new Subject<string>()
  get removeStudentAsobs():Observable<string>{
      return this.RemoveStudentSub$.asObservable()
  }
  emitRomovestudent(id:string){
      this.RemoveStudentSub$.next(id)
  }
  constructor(
    private _http : HttpClient
  ) { }

  fetchAllStudent():Observable<any>{
    return  this._http.get(this.POST_STUDENTURL)
      .pipe(
        map((data:any)=>{
          let studentArr:Array<any>=[]
          for (const key in data) {
            studentArr.push({...data[key],id:key})
          }
          return studentArr
        })
      )
    }

  AddStudent(student:Istudent):Observable<any>{
      return this._http.post<any>(this.POST_STUDENTURL,student)
  }
    
  studentUpdate(student:Istudent){
        let UPDATE_URL=`${environment.BaseUrl_student}/student/${student.id}/.json`
        return this._http.patch(UPDATE_URL,student)
  }
    
  RemoveStudent(student:Istudent):Observable<any>{
        let REMOVE_URL=`${environment.BaseUrl_student}/student/${student.id}/.json`
         return this._http.delete<any>(REMOVE_URL)
    
  }
}
