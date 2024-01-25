import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { VIEWS_IDS } from '@app/services/navigation/Ids.config';
import { NavigationService } from '@app/services/navigation/navigation.service';
import { Subscription } from 'rxjs';
import { LocalStorageService, User } from '../../services/local-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, AfterViewInit, OnDestroy {
  //#region Declarations
  @ViewChild('profileParent', { static: true }) profileParent: ElementRef;
  @ViewChild('editParent', { static: true }) editParent: ElementRef;
  @ViewChild('actionParent', { static: true }) actionParent: ElementRef;

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

  is_editMode: boolean = false;

  profiles: User[]= [];
  //#endregion

  constructor(
    private router: Router,
    private _navigationS: NavigationService,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.getAllUser();
  }

  ngAfterViewInit(): void {
    this.getNavState();
  }

  ngOnDestroy() {
    this.navigation.unsubscribe();
  }

  //Navigation Methods
  getNavState() {
    this.navigation = this._navigationS.navState.subscribe((data) => {
      data.id === VIEWS_IDS.PROFILE ? this.handleNavAction(data.action) : null;
    });
  }

  selectProfile(profile?) {
    if (this.is_editMode) {
      this.router.navigateByUrl(
        `edit-profile-${VIEWS_IDS.ADD_PROFILE}/${profile.id}`
      );
    } else {
      this.localStorage.setCurrentUser(profile);
      this.router.navigateByUrl(`home/testList-${VIEWS_IDS.HOME}`);
    }
  }

  goToAddProfile() {
    this.router.navigateByUrl(`add-profile-${VIEWS_IDS.ADD_PROFILE}`);
  }

  clickOnActiveCard() {
    this.elements.element.dispatchEvent(new Event('click'));
  }

  handleNavAction(action: String) {
    switch (action) {
      case this._navigationS.navActions.NavInit:
        this.setProfileKeys();
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
        if (this.parentIsProfileActions()) {
          this.goToProfiles();
        } else if (this.parentIsProfile() && !this.is_editMode && this.profiles.length) {
          this.goToEditProfile();
        } else {
          return;
        }
        break;

      case this._navigationS.navActions.ArrowDown:
        if (this.parentIsEditProfile()) {
          this.goToProfiles();
        } else if (this.parentIsProfile() && this.is_editMode) {
          this.goToAction();
        } else {
          return;
        }
        break;

      default:
        break;
    }
  }

  //DOM Manipulation Methods
  setProfileKeys() {
    this.elements.blur();
    this.elements.parent = this.profileParent.nativeElement;
    this.elements.element = this.profileParent.nativeElement.firstElementChild;
    this.elements.focus();
  }

  parentIsProfile() {
    if (this.elements.parent == this.profileParent.nativeElement) {
      return true;
    }
  }

  parentIsEditProfile() {
    if (this.elements.parent == this.editParent.nativeElement) {
      return true;
    }
  }

  parentIsProfileActions() {
    if (this.elements.parent == this.actionParent.nativeElement) {
      return true;
    }
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
    if (this.parentIsProfile() && !this.isLastChild()) {
      this.elements.blur();
      this.elements.element = this.elements.element.nextElementSibling;
      this.elements.focus();
    } else {
      return;
    }
  }

  prevChild() {
    if (this.parentIsProfile() && !this.isFirstChild()) {
      this.elements.blur();
      this.elements.element = this.elements.element.previousElementSibling;
      this.elements.focus();
    }
  }

  goToProfiles() {
    this.elements.blur();
    this.elements.parent = this.profileParent.nativeElement;
    this.elements.element = this.profileParent.nativeElement.firstElementChild;
    this.elements.focus();
  }

  goToEditProfile() {
    this.elements.blur();
    this.elements.parent = this.editParent.nativeElement;
    this.elements.element = this.editParent.nativeElement.firstElementChild;
    this.elements.focus();
  }

  goToAction() {
    this.elements.blur();
    this.elements.parent = this.actionParent.nativeElement;
    this.elements.element = this.actionParent.nativeElement.firstElementChild;
    this.elements.focus();
  }

  removeFocus() {
    this.elements.blur();
    this.elements.parent = null;
    this.elements.element = null;
  }

  //Profile Methods
  initEditMode() {
    this.is_editMode = true;
    this.goToProfiles();
  }

  cancelEditMode() {
    this.is_editMode = false;
    this.goToProfiles();
  }

  getAllUser() {
    this.profiles = this.localStorage.getAllUsers();      
  }
}
