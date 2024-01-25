import { LocalizationService } from './core/services/localization/localization.service';
import { Component } from '@angular/core';
import { NavigationService } from '@app/services/navigation/navigation.service';
import { LocalStorageService } from './modules/services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Shuffle-TV';

  constructor(
    private _localizationS: LocalizationService,
    private navigationService: NavigationService,
    private localStorage: LocalStorageService
    
  ) {
    this._localizationS.init();
  }

  ngOnInit() {
    this.navigationService.init();

    //! FOR DEMO ONLY REMOVE LATER
    this.localStorage.ngOnInit();
  }
}
