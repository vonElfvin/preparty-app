import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SpinnerService } from './core/spinner/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading: Observable<boolean>;

  constructor(
    private spinnerService: SpinnerService
  ) { }

  ngOnInit() {
    this.loading = this.spinnerService.loader;
  }
}
