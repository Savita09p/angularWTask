import { Component, inject } from '@angular/core';
import { LoaderService } from './shared/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularWTask';

  private _laoder = inject(LoaderService);
  loading$ = this._laoder.isLoading;
}
