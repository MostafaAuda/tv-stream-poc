import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NavigationService } from '@app/services/navigation/navigation.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { VIEWS_IDS } from '@app/services/navigation/Ids.config';
import { LocalStorageService } from 'src/app/modules/services/local-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  //#region Declarations
  @ViewChild('pagesParent', { static: true }) pagesParent: ElementRef;

  isMenuClosed = true;
  private navigation!: Subscription;

  activeChild;
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
  VIEWS_IDS: any;
  currentUser;
  //#endregion

  constructor(
    private router: Router,
    private _navigationS: NavigationService,
    private localStorage: LocalStorageService
  ) {
    this.VIEWS_IDS = VIEWS_IDS
  }

  ngOnInit() {
    this.getCurrentUser();
  }

  ngAfterViewInit(): void {
    this.getNavState();
  }

  ngOnDestroy() {
    this.removeFocus();
    this.navigation.unsubscribe();
  }

  //Navigation Methods
  getNavState() {
    this.navigation = this._navigationS.navState.subscribe((data) => {
      data.id === VIEWS_IDS.MENU ? this.handleNavAction(data.action) : null;
    });
  }

  goToView() {
    if (this.elements.element == this.activeChild) {
      this._navigationS.closeMenu();
    } else {
      this.elements.element.dispatchEvent(new Event('click'));
      this._navigationS.closeMenu(false);
    }
  }

  navigateByUrl($event) {
    this.router.navigateByUrl($event);
  }

  doNothing() {
    this._navigationS.closeMenu();
  }

  //Side Nav keys actions
  handleNavAction(action: String) {
    switch (action) {
      case this._navigationS.navActions.Enter:
        this.goToView();
        break;

      case this._navigationS.navActions.ArrowRight:
        this.goToView();
        break;

      case this._navigationS.navActions.ArrowLeft:
        break;

      case this._navigationS.navActions.ArrowUp:
        this.prevChild();
        break;

      case this._navigationS.navActions.ArrowDown:
        this.nextChild();
        break;

      case this._navigationS.navActions.Back:
        //If on home already we show exit app pop up instead
        this.removeFocus();
        this._navigationS.closeMenu();
        break;

      case this._navigationS.navActions.MenuOpened:
        //If on home already we show exit app pop up instead
        this.initFocus();
        break;

      case this._navigationS.navActions.MenuClosed:
        //If on home already we show exit app pop up instead
        this.removeFocus();
        break;

      default:
        break;
    }
  }

  //DOM Manipulation Methods
  initFocus() {
    this.isMenuClosed = false;
    this.getActiveChild();
    this.elements.blur();
    this.elements.parent = this.pagesParent.nativeElement;
    this.elements.element = this.activeChild;
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
    }
  }

  getActiveChild() {
    this.pagesParent.nativeElement.childNodes.forEach((element) => {
      if (element.classList.contains('active')) {
        this.activeChild = element;
      }
    });
  }

  removeFocus() {
    this.isMenuClosed = true;
    this.elements.blur();
    this.elements.parent = null;
    this.elements.element = null;
  }

  //Dashboard methods
  getCurrentUser() {    
    this.currentUser = this.localStorage.getCurrentUser();
  }
}
