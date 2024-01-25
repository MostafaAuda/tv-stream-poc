import { TranslateService } from '@ngx-translate/core';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { LocalizationService } from '@app/services/localization/localization.service';
import { VIEWS_IDS } from '@app/services/navigation/Ids.config';
import { DialogType, NavigationService } from '@app/services/navigation/navigation.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, AfterViewInit, OnDestroy {
  //#region Declarations
  @ViewChild('languageContainer', { static: true })
  languageContainer: ElementRef;

  private navigation!: Subscription;

  elements = {
    parent: null,
    element: null,

    focus() {
      return this.element?.classList.add('focused');
    },

    blur() {
      return this.element?.classList.remove('focused');
    },
  };

  currentLang;
  selectedLang: any;
  //#endregion

  constructor(
    private _navigationS: NavigationService,
    private _localizationS: LocalizationService,
    public ngxSmartModalService: NgxSmartModalService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.getNavState();
  }

  ngOnDestroy(): void {
    this.navigation.unsubscribe();
  }

  //Navigation Methods
  getNavState() {
    this.navigation = this._navigationS.navState.subscribe((data) => {
      this.currentLang = data.lang;
      data.id === VIEWS_IDS.SETTINGS ? this.handleNavAction(data.action) : null;
    });
  }

  openMenu() {
    this._navigationS.openMenu();
  }

  clickOnActiveCard() {
    this.elements.element.dispatchEvent(new Event('click'));
  }

  handleNavAction(action: String) {
    switch (action) {
      case this._navigationS.navActions.NavInit:
        this.setLanguagesKeys();
        break;

      case this._navigationS.navActions.Enter:
        this.clickOnActiveCard();
        break;

      case this._navigationS.navActions.ArrowRight:
        this.nextChild();
        break;

      case this._navigationS.navActions.ArrowLeft:
        this.prevChild();
        break;

      case this._navigationS.navActions.ArrowUp:
        break;

      case this._navigationS.navActions.ArrowDown:
        break;

      case this._navigationS.navActions.Back:
        this.openMenu();
        break;

      case this._navigationS.navActions.MenuClosed:
        break;

      default:
        break;
    }
  }

  //DOM Manipulation Methods
  setLanguagesKeys() {
    this.elements.blur();
    this.elements.parent = this.languageContainer.nativeElement;
    if (this.currentLang === 'en') {
      this.elements.element =
        this.languageContainer.nativeElement.firstElementChild;
    } else {
      this.elements.element =
        this.languageContainer.nativeElement.lastElementChild;
    }
    this.elements.focus();
  }

  isFirstChild() {
    if (this.elements.element == this.elements.parent.firstElementChild) {
      return true;
    }
  }

  isLastChild() {
    if (this.elements.element == this.elements.parent.lastElementChild) {
      return true;
    }
  }

  nextChild() {
    if (!this.isLastChild()) {
      this.elements.blur();
      this.elements.element = this.elements.element.nextElementSibling;
      this.elements.focus();
    }
  }

  prevChild() {
    if (!this.isFirstChild()) {
      this.elements.blur();
      this.elements.element = this.elements.element.previousElementSibling;
      this.elements.focus();
    } else{
      this.openMenu()
    }
  }

  removeFocus() {
    this.elements.blur();
    this.elements.parent = null;
    this.elements.element = null;
  }

  //Settings Methods
  changeLang(lang) {
    if (this.currentLang === lang) {
      return
    }

    this.selectedLang = lang;
    this._navigationS.openConfirmationModal({
      type: DialogType.CONFIRMATION,
      msg: this.translateService.instant("Are you sure you want to change language? the app will be reloaded."),
      confirmFun: this.onConfirmChangeLang.bind(this)
    })
  }

  onConfirmChangeLang() {
    switch (this.selectedLang) {
      case 'ar':
        this._localizationS.setLangAr();
        break;

      case 'en':
        this._localizationS.setLangEn();
        break;
      default:
        break;
    }
  }

}
