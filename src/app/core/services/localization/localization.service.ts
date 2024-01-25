import { NAV_SETTINGS } from './../navigation/nav.settings';
import { LoadingUIService } from './../loadingUI/loading-ui.service';
import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
// import { ParamsService } from '../params/params.service';
import { DOCUMENT, registerLocaleData } from '@angular/common';
import localEg from '@angular/common/locales/ar-EG';
import * as ar from '../../../../assets/i18n/ar.json';
import * as en from '../../../../assets/i18n/en.json';
@Injectable({
  providedIn: 'root',
})
export class LocalizationService {
  private userLang: string = 'en';
  private acceptedLangs = ['ar', 'en'];

  constructor(
    private translate: TranslateService,
    @Inject(DOCUMENT)
    private document: Document /*private _paramService: ParamsService*/,
    private _loadingUI: LoadingUIService
  ) { }

  init() {
    this.tempSplashFunction()
    registerLocaleData(localEg, 'ar');
    this.translate.setTranslation('ar', ar);
    this.translate.setTranslation('en', en);
    //pram > local > default
    this.userLang = localStorage.getItem('lang') || 'en';
    this.setUserLang(this.userLang);
  }
  tempSplashFunction() {
    if (NAV_SETTINGS.ENABLE_SPLASH) {
      this._loadingUI.showFullScreenSpinner()
      setTimeout(() => {
        this._loadingUI.hideFullScreenSpinner()
      }, 3000);
    }

  }

  private setUserLang(lang) {
    if (!this.acceptedLangs.includes(lang)) {
      console.warn(
        "Language in param is not supported or lang param does not exist, please use 'ar' or 'en' for 'lang' param, user language automatically set to 'en"
      );
      lang = 'en';
    }

    this.translate.use(lang);

    this.userLang = lang;
    this.document.documentElement.lang = lang;

    if (lang == 'ar') {
      this.document.documentElement.dir = 'rtl';
    } else {
      this.document.documentElement.dir = 'ltr';
    }

    localStorage.setItem('lang', lang);
  }

  getUserLang() {
    return this.userLang;
  }

  setLangAr() {
    // this.setUserLang('ar');
    //todo H uncomment the above and don't reload the app
    localStorage.setItem('lang', 'ar');
    this.document.location.reload();
  }

  setLangEn() {
    // this.setUserLang('ar');
    //todo H uncomment the above and don't reload the app
    localStorage.setItem('lang', 'en');
    this.document.location.reload();
  }
}
