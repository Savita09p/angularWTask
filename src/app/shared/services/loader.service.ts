import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
 isLoading = new BehaviorSubject<boolean>(false);

  constructor() {}
  showloader() {
    this.isLoading.next(true);
  }
  hideloader() {
    this.isLoading.next(false);
  }
  
}
