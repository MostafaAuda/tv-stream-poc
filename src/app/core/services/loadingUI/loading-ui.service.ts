import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class LoadingUIService {
  constructor(private spinner: NgxSpinnerService) {}

  showFullScreenSpinner() {
    return this.spinner.show('fullScreen');
  }
  hideFullScreenSpinner() {
    return this.spinner.hide('fullScreen');
  }

  showDefaultSpinner() {
    return this.spinner.show('default');
  }
  hideDefaultSpinner() {
    return this.spinner.hide('default');
  }
}
