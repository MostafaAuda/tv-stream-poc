import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalizationService } from '@app/services/localization/localization.service';
import { MODALS_NAMES, VIEWS_IDS } from '@app/services/navigation/Ids.config';
import { NavigationService } from '@app/services/navigation/navigation.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LocalStorageService, User } from '../../services/local-storage.service';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.scss'],
})
export class AddProfileComponent implements OnInit, AfterViewInit, OnDestroy {
  //#region Declarations
  @ViewChild('keyboard', { static: true }) keyboard: ElementRef;
  @ViewChild('keyboardActions', { static: true }) keyboardActions: ElementRef;
  @ViewChild('spaceKey', { static: true }) spaceKey: ElementRef;
  @ViewChildren('key') keys?: QueryList<ElementRef>;

  @ViewChild('kidModeParent', { static: true }) kidModeParent: ElementRef;
  @ViewChild('kidModeElement', { static: true }) kidModeElement: ElementRef;
  @ViewChild('languageParent', { static: true }) languageParent: ElementRef;
  @ViewChild('submitParent', { static: true }) submitParent: ElementRef;
  @ViewChild('deleteParent', { static: true }) deleteParent: ElementRef;
  @ViewChild('profileImage', { static: true }) profileImage: ElementRef;

  private navigation!: Subscription;

  elements = {
    parent: null,
    element: null,
    keyMod: null,

    focus() {
      return this.element?.classList.add('focused');
    },

    blur() {
      return this.element?.classList.remove('focused');
    },
  };

  //Keyboard Properties
  keyboardKeys;
  totalKeys;
  keyIndex: number = 0;
  keyboardRowCount: number = 6;
  keyboardLastRow;

  englishKeys = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
  ];

  arabicKeys = [
    'ا',
    'ب',
    'ت',
    'ث',
    'ج',
    'ح',
    'خ',
    'د',
    'ذ',
    'ر',
    'ز',
    'س',
    'ش',
    'ص',
    'ض',
    'ط',
    'ظ',
    'ع',
    'غ',
    'ف',
    'ق',
    'ك',
    'ل',
    'م',
    'ن',
    'ه',
    'و',
    'ى',
    'ة',
    'ئ',
    'ء',
    'ؤ',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
  ];
  showArLang: boolean = false;

  compineText: any[] = [];
  nameText: string = this.translateService.instant("Enter your name");
  is_kidMode: boolean = false;
  currentLang;
  profile: User = {
    id: null,
    name: '',
    profilePic: '',
    kidMode: false,
    lang: '', 
  };
  profilePicture: string;
  profileID;
  in_editMode;
  //#endregion

  constructor(
    private _navigationS: NavigationService,
    private router: Router,
    private _localizationS: LocalizationService,
    private localStorage: LocalStorageService,
    private route: ActivatedRoute,
    private translateService: TranslateService
  ) {
    this.route.params.subscribe((param: any) => {
      this.profileID = param.id;
    });
  }

  ngOnInit(): void {
    if (this.profileID) {
      this.in_editMode = true;
      this.setProfileDataOnEdit(this.profileID);
    }  
    this.getCurrentImage();
    this.getActiveLanguage();  
  }

  ngAfterViewInit(): void {
    this.getNavState();
  }

  ngOnDestroy(): void {
    this.navigation.unsubscribe();
  }

  //Initiate Keyboard
  initKeyboardKeys() {
    this.initKeyboardBasedOnLang();
    this.keys?.changes.subscribe((res) => {
      this.initKeyboardBasedOnLang(res);
    });
  }

  //Navigation Methods
  getNavState() {
    this.navigation = this._navigationS.navState.subscribe((data) => {
      data.id === VIEWS_IDS.ADD_PROFILE
        ? this.handleNavAction(data.action)
        : null;
    });
  }

  openMenu() {
    this._navigationS.openMenu();
  }

  clickOnActiveCard() {
    this.elements.element.dispatchEvent(new Event('click'));
  }

  goToProfileView() {
    this.router.navigateByUrl(`profile-${VIEWS_IDS.PROFILE}`);
  }

  changePicture() {
    this._navigationS.openModal(VIEWS_IDS.CHANGE_PICTURE_MODAL, MODALS_NAMES.CHANGE_PICTURE_MODAL);
  }

  handleNavAction(action: String) {
    switch (action) {
      case this._navigationS.navActions.NavInit:
        this.initKeyboardKeys();
        break;

      case this._navigationS.navActions.Enter:
        this.clickOnActiveCard();
        break;

      case this._navigationS.navActions.ArrowRight:
        if (this.parentIsKeyboard()) {
          this.keyIndex == this.totalKeys || this.elements.keyMod == 5
            ? this.goToProfileImage()
            : this.nextKey();
        } 

        if (this.parentIsSubmit() || this.parentIsDelete() || (this.parentIsActions() && this.isLastChild())) {
          this.goToProfileImage();
        }

        if (this.parentIsActions() || this.parentIsLanguage()) {
          this.nextChild();
        }
        break;

      case this._navigationS.navActions.ArrowLeft:
        if ((this.parentIsImage() || this.parentIsKidMode()) || (this.parentIsLanguage() && this.isFirstChild())) {          
          this.goToKeyboard();
        } else if (this.parentIsActions() || this.parentIsLanguage()) {    
          this.prevChild();
        } else {
          this.prevKey();
        }
        break;

      case this._navigationS.navActions.ArrowUp:
        if (this.parentIsDelete()) {
          this.goToSubmitKey();
        } else if (this.parentIsSubmit()) {
          this.goToActionsKeys();
        } else if (this.parentIsActions()) {
          this.goToKeyboard();
        } else if (this.parentIsKeyboard()) {
          this.goKeyUp();
        }

        if (this.parentIsLanguage()) {
          this.goToKidModeKeys();
        } else if (this.parentIsKidMode()) {
          this.goToProfileImage();
        }
        break;

      case this._navigationS.navActions.ArrowDown:
        if (this.parentIsKeyboard()) {
          if (this.keyIndex > this.keyboardLastRow) {
            this.goToActionsKeys();
          } else {
            this.goKeyDown();
          }
        } else if (this.parentIsActions()) {
          this.goToSubmitKey();
        } else if (this.parentIsSubmit() && this.in_editMode) {
          this.goToDeleteKey();
        }

        if (this.parentIsImage()) {
          this.goToKidModeKeys();
        } else if (this.parentIsKidMode()) {
          this.goToLanguageKeys();
        }
        break;

      case this._navigationS.navActions.Back:
        this.goToProfileView();
        break;

      case this._navigationS.navActions.MenuClosed:
        break;

      default:
        break;
    }
  }

  //DOM manipulation keyboard methods
  initKeyboardBasedOnLang(res?) {
    if (res) {
      this.keyboardKeys = res?.toArray();
      this.setKeyboardKeys();
    } else {
      this.keyboardKeys = this.keys?.toArray();
      this.setKeyboardKeys();
    }
  }

  setKeyboardKeys() {
    this.totalKeys = this.keyboardKeys.length - 1;
    this.keyboardLastRow = this.totalKeys - this.keyboardRowCount;
    this.keyIndex = 0;
    this.elements.blur();
    this.elements.parent = this.keyboard.nativeElement;
    this.elements.element = this.keyboardKeys[this.keyIndex].nativeElement;
    this.elements.focus();
  }

  goToKeyboard() {
    this.elements.blur();
    this.elements.parent = this.keyboard.nativeElement;
    this.elements.element = this.keyboardKeys[this.keyIndex].nativeElement;
    this.elements.focus();
  }

  parentIsKeyboard() {
    if (this.elements.parent == this.keyboard.nativeElement) {
      return true;
    }
  }

  nextKey() {
    if (this.keyIndex != this.totalKeys) {
      ++this.keyIndex;
    }

    this.elements.blur();
    this.elements.element = this.keyboardKeys[this.keyIndex].nativeElement;
    this.elements.focus();

    this.getKeyModulo();
  }

  prevKey() {
    if (this.keyIndex !== 0 && this.elements.keyMod !== 0) {
      --this.keyIndex;

      this.elements.blur();
      this.elements.element = this.keyboardKeys[this.keyIndex].nativeElement;
      this.elements.focus();

      this.getKeyModulo();
    }
  }

  goKeyDown() {
    this.keyIndex += this.keyboardRowCount;

    this.elements.blur();
    this.elements.element = this.keyboardKeys[this.keyIndex].nativeElement;
    this.elements.focus();
  }

  goKeyUp() {
    if (this.keyIndex >= this.keyboardRowCount) {
      this.keyIndex -= this.keyboardRowCount;

      this.elements.blur();
      this.elements.element = this.keyboardKeys[this.keyIndex].nativeElement;
      this.elements.focus();
    }
  }

  getKeyModulo() {
    this.elements.keyMod = this.keyIndex % this.keyboardRowCount;
  }

  //DOM manipulation methods
  goToActionsKeys() {
    this.elements.blur();
    this.elements.parent = this.keyboardActions.nativeElement;
    this.elements.element = this.spaceKey.nativeElement;
    this.elements.focus();
  }

  goToKidModeKeys() {
    this.elements.blur();
    this.elements.parent = this.kidModeParent.nativeElement;
    this.elements.element = this.kidModeParent.nativeElement;
    this.elements.focus();
  }

  goToLanguageKeys() {
    this.elements.blur();
    this.elements.parent = this.languageParent.nativeElement;
    if (this.currentLang == 'en') {
      this.elements.element =
        this.languageParent.nativeElement.firstElementChild;
    } else {
      this.elements.element =
        this.languageParent.nativeElement.lastElementChild;
    }
    this.elements.focus();
  }

  goToSubmitKey() {
    this.elements.blur();
    this.elements.parent = this.submitParent.nativeElement;
    this.elements.element = this.submitParent.nativeElement;
    this.elements.focus();
  }

  goToDeleteKey() {
    this.elements.blur();
    this.elements.parent = this.deleteParent.nativeElement;
    this.elements.element = this.deleteParent.nativeElement.firstElementChild;
    this.elements.focus();
  }

  goToProfileImage() {
    this.elements.blur();
    this.elements.parent = this.profileImage.nativeElement;
    this.elements.element = this.profileImage.nativeElement;
    this.elements.focus();
  }

  parentIsActions() {
    if (this.elements.parent == this.keyboardActions.nativeElement) {
      return true;
    }
  }

  parentIsKidMode() {
    if (this.elements.parent == this.kidModeParent.nativeElement) {
      return true;
    }
  }

  parentIsLanguage() {
    if (this.elements.parent == this.languageParent.nativeElement) {
      return true;
    }
  }

  parentIsSubmit() {
    if (this.elements.parent == this.submitParent.nativeElement) {
      return true;
    }
  }

  parentIsDelete() {
    if (this.elements.parent == this.deleteParent.nativeElement) {
      return true;
    }
  }

  parentIsImage() {
    if (this.elements.parent == this.profileImage.nativeElement) {
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

  removeFocus() {
    this.elements.blur();
    this.elements.parent = null;
    this.elements.element = null;
    this.elements.keyMod = null;
  }

  /*Add Profile Methods*/
  //Type name methods
  copyText(text) {
    this.compineText.push(text);

    this.typeName();
  }

  deleteText() {
    this.compineText.pop();

    this.typeName();
  }

  switchLang() {
    this.showArLang = !this.showArLang;
  }

  addSpace() {
    var checkIfSpace = this.compineText[this.compineText.length - 1];

    if (checkIfSpace === ' ') {
      return;
    } else {
      this.compineText.push(' ');

      this.typeName();
    }
  }

  typeName() {
    this.nameText = this.compineText.join('');
  }

  //Profile Methods
  setProfileDataOnEdit(id: number) {
    this.profile = this.localStorage.getUserById(+id);
    this.nameText = this.profile.name;
    this.profilePicture = this.profile.profilePic;
    this.is_kidMode = this.profile.kidMode;
    this.kidModeElement.nativeElement.checked = this.is_kidMode;    
  }

  //Toggle kid mode
  toggleKidMode() {
    this.kidModeElement.nativeElement.click();
    this.is_kidMode = this.kidModeElement.nativeElement.checked;
  }

  //Language methods
  getActiveLanguage () {
    this._navigationS.navState.subscribe((data) => {
      this.currentLang = data.lang;
    });
  }

  changeLang(lang) {
    switch (lang) {
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

  //Change image methods
  getCurrentImage(picture?) {
    if (!this.in_editMode) {
      this.profilePicture = picture || 'https://occ-0-2706-2705.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAAFG6fc9-Xvktp_BPYnOyOq0gUuAUqBWLkwMPWP_yhNgZxO6tBpSLZ5QnM_EYalaVEAOdB4OfeKEaW8vssVnhd2wru-Q.png?r=3af';
    } else {
      this.profilePicture = picture || this.profile.profilePic;
    }
  }

  //Submission methods
  submit () {
    this.is_kidMode = this.kidModeElement.nativeElement.checked;
    this.profile.name = this.nameText;
    this.profile.kidMode = this.is_kidMode;
    this.profile.profilePic = this.profilePicture;

    if (this.in_editMode) {
      this.editProfile(this.profile.id, this.profile);
    } else {
      this.addProfile(this.profile);
    }
  }

  addProfile(profile) {
    this.localStorage.addNewUser(profile);
    this.goToProfileView()
  }

  editProfile(profileId, profile) {    
    this.localStorage.updateUserById(profileId, profile);
    this.goToProfileView()
  }

  deleteProfile() {    
    this.localStorage.deleteUserById(this.profile.id);
    this.goToProfileView();
  }
}
