// import { ConfirmationDialogComponent } from './../../../shared/dialogs/confirmation-dialog/confirmation-dialog.component';
// import { NAV_SETTINGS } from './nav.settings';`
import { VIEWS_IDS } from './Ids.config';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LocalizationService } from '../localization/localization.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
declare var webOS
@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(
    private router: Router,
    private _localizationS: LocalizationService,
    public ngxSmartModalService: NgxSmartModalService,

  ) { }
  delay: boolean = false;

  //#region Declarations
  //Subscriptions
  navState: BehaviorSubject<NavEvent> = new BehaviorSubject(null);

  //variables and constants
  private activeNavId: number = null;
  private currentRouteUrl;
  private remoteKeys: RemoteKeys = {
    Enter: 13,
    ArrowUp: 38,
    ArrowDown: 40,
    ArrowRight: 39,
    ArrowLeft: 37,
    Escape: 27,
    lgEscape: 461,
    SamEscape: 10009,
    // samExit : 'XF86Back',
  };

  navActions: NavActions = {
    NavInit: 'NavInit',
    Back: 'Back',
    ArrowDown: 'ArrowDown',
    ArrowLeft: 'ArrowLeft',
    ArrowRight: 'ArrowRight',
    ArrowUp: 'ArrowUp',
    Enter: 'Enter',
    PageDown: 'PageDown',
    PageUp: 'PageUp',
    MenuClosed: 'MenuClosed',
    MenuOpened: 'MenuOpened',
  };
  //#endRegion

  //init
  init() {
    this.checkIfLg()
    this.setArrowsDirection();
    window.addEventListener('keydown', (event) => this.handleKeyEvent(event));
    this.listenOnNavigationIdChange();
  }

  //private service methods
  private setArrowsDirection() {
    if (this._localizationS.getUserLang() === 'ar') {
      this.remoteKeys.ArrowRight = 37;
      this.remoteKeys.ArrowLeft = 39;
    } else {
      this.remoteKeys.ArrowRight = 39;
      this.remoteKeys.ArrowLeft = 37;
    }
  }

  private listenOnNavigationIdChange() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.changeActiveNavIdAndUrl(
          this.getViewIdNumber(event.urlAfterRedirects),
          event.url
        );
        this.fireNavAction(this.navActions.NavInit);
      }
    });
  }

  private changeActiveNavIdAndUrl(id: number, url: string) {
    this.activeNavId = +id;
    this.currentRouteUrl = url;
  }

  // private changeNavState(state: boolean) {
  //   this.enableNav = state;
  // }

  private fireNavAction(action: String) {
    let data = {
      id: this.activeNavId,
      action,
      homeTranslateValue: this.gethomeTranslateValue(),
      lang: this._localizationS.getUserLang(),
      videoDescTranslateValue: this.getVideoDescTranslateValue()
    }
    this.navState.next(data);
  }

  //Home horizontal translate
  private gethomeTranslateValue() {
    if (this._localizationS.getUserLang() === 'ar') {
      return -14;
    } else {
      return 14;
    }
  }

  //Video description horizontal translate
  private getVideoDescTranslateValue() {
    if (this._localizationS.getUserLang() === 'ar') {
      return -51.1;
    } else {
      return 51.1;
    }
  }

  //TODO: this fun and menuState BS need to be deleted and handle menu events from the only BH we need here (navState) and add new action to the navActions (menuOpen)
  // checkNavigatePerm(id: number): boolean {
  //   return id == this.activeNavId;
  // }

  //TODO: menus functions need enhancement and retest after all views/pages implementing the new nav login
  openMenu() {
    this.changeActiveNavIdAndUrl(VIEWS_IDS.MENU, this.currentRouteUrl);
    this.fireNavAction(this.navActions.MenuOpened);
  }

  closeMenu(notifyView: boolean = true) {
    //Close action for menu
    this.fireNavAction(this.navActions.MenuClosed);
    if (notifyView) {
      this.changeActiveNavIdAndUrl(
        this.getViewIdNumber(this.currentRouteUrl),
        this.currentRouteUrl
      );

      //Close action for view
      this.fireNavAction(this.navActions.MenuClosed);
    }
  }

  goToVideo(videoId?, videoType?) {
    this.router.navigateByUrl(`video-desc-${VIEWS_IDS.VIDEO_DESC}/${videoId}/${videoType}`);
  }
  
  openModal(id, name) {    
    this.changeActiveNavIdAndUrl(id, this.currentRouteUrl);
    this.ngxSmartModalService.getModal(name).open();
    this.fireNavAction(this.navActions.NavInit)
  }

  closeModal(name) {
    this.changeActiveNavIdAndUrl(
      this.getViewIdNumber(this.currentRouteUrl),
      this.currentRouteUrl
    );
    this.ngxSmartModalService.getModal(name).close();
  }

  //todo change modal name to e.g > dialog...
  //confirmFun and cancelFun > type = confirmation, okFun > type = info or success, tryAgainFun, cancelFun > type = error
  //["confirmation","info","error","success"]
  openConfirmationModal(data: DialogData) {
    data.returnId = this.activeNavId
    //to use the below line CSS and html needs to be edited
    // this.ngxSmartModalService.create('confirmation',ConfirmationDialogComponent).setData(data).open()
    this.ngxSmartModalService.getModal('confirmation').setData(data).open()
    this.changeActiveNavIdAndUrl(VIEWS_IDS.CONFIRMATION_MODAL, this.currentRouteUrl);
    this.fireNavAction(this.navActions.NavInit)
  }

  closeConfirmationModal(returnId) {
    this.changeActiveNavIdAndUrl(
      returnId || this.getViewIdNumber(this.currentRouteUrl),
      this.currentRouteUrl
    );
    this.ngxSmartModalService.getModal('confirmation').close();
  }

  //Helper Methods
  private getViewIdNumber(text) {
    if (text.match(/\d+/)) {
      return text.match(/\d+/)[0];
    }
  }

  private checkIfLg(){
    if (webOS.platform.tv === true) {
      console.log(this.getLgDeviceInfo());
      return true
    } else {
      console.log('This device is not TV.');
    }
  }

  private async getLgDeviceInfo() {
    return await webOS.deviceInfo(d=>{ return d})
  }
  
  private handleKeyEvent(event: KeyboardEvent) {
    //check nav state
    // if (!NAV_SETTINGS.ENABLE_NAV) {
    //   return;
    // }
    // //delay can not be a stand alone function
    // if (this.delay) {
    //   return;
    // }

    // this.delay = true;

    // setTimeout(() => {
    //   this.delay = false;
    // }, NAV_SETTINGS.GLOBAL_DELAY_MS);
    
    switch (event.keyCode) {
      case this.remoteKeys.Enter:
        this.fireNavAction(this.navActions.Enter);
        break;

      case this.remoteKeys.ArrowRight:
        this.fireNavAction(this.navActions.ArrowRight);
        break;

      case this.remoteKeys.ArrowLeft:
        this.fireNavAction(this.navActions.ArrowLeft);
        break;

      case this.remoteKeys.ArrowUp:
        this.fireNavAction(this.navActions.ArrowUp);
        break;

      case this.remoteKeys.ArrowDown:
        this.fireNavAction(this.navActions.ArrowDown);
        break;

      case this.remoteKeys.Escape:
        this.fireNavAction(this.navActions.Back);
        break;

      case this.remoteKeys.lgEscape:
        this.fireNavAction(this.navActions.Back);
        break;

      case this.remoteKeys.SamEscape:
        this.fireNavAction(this.navActions.Back);
        break;

      default:
        break;
    }
  }
}

export enum status {
  opened = 'opened',
  closed = 'closed',
}

//InterFaces
interface RemoteKeys {
  Backspace?: Number;
  Escape?: Number;
  lgEscape?: Number;
  samExit?: Number;
  Enter?: Number;
  ArrowUp?: Number;
  ArrowDown?: Number;
  ArrowRight?: Number;
  ArrowLeft?: Number;
  PageUp?: Number;
  PageDown?: Number;
  SamEscape?: Number;
}

export interface NavActions {
  NavInit: String;
  Back: String;
  Enter: String;
  ArrowUp: String;
  ArrowDown: String;
  ArrowRight: String;
  ArrowLeft: String;
  PageUp: String;
  PageDown: String;
  MenuOpened: String;
  MenuClosed: String;
}

export interface NavEvent {
  id: Number;
  action: String;
  lang: String;
  homeTranslateValue: number;
  videoDescTranslateValue: number;
}

export enum DialogType {
  CONFIRMATION = "CONFIRMATION",
  INFO = "INFO",
  ERROR = "ERROR",
  SUCCESS = "SUCCESS"

}
export interface DialogData {
  type: DialogType,
  msg: String,
  confirmFun?: Function,
  cancelFun?: Function,
  okFu?: Function,
  tryAgainFu?: Function,
  returnId?: Number
}

