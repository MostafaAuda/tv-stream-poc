import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MODALS_NAMES, VIEWS_IDS } from '@app/services/navigation/Ids.config';
import { NavigationService } from '@app/services/navigation/navigation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-change-picture-modal',
  templateUrl: './change-picture-modal.component.html',
  styleUrls: ['./change-picture-modal.component.scss']
})
export class ChangePictureModalComponent implements OnInit, AfterViewInit, OnDestroy {

  //#region Declarations
  @ViewChild('imagesParent', { static: true }) imagesParent: ElementRef;
  @ViewChildren('image') images?: QueryList<ElementRef>;
  
  private navigation!: Subscription;

  elements = {
    parent: null,
    element: null,
    imageMod: null,

    focus() {
      return this.element?.classList.add('focused');
    },

    blur() {
      return this.element?.classList.remove('focused');
    },
  };

  emojis = [
    'https://occ-0-2706-2705.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAAFCW8LKHEQQ1sspbMX93bQzbtgd8ILjaBgdnYxmjldOrnrhX55BI0V6ks7Az7cTR4lCdadH0ixQQFdWTlj7P169lBEg.png?r=a30',
    'https://occ-0-2706-2705.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAAFAvvq6OeChgYPMIeAZSR-dIuPkKFKJeNmVW_cgxygDSnTf8HJ_iuTJhwTnQulXq_kaAuEbwWQobtrUn_RAa3j1Ps4w.png?r=762',
    'https://occ-0-2706-2705.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAAFAJio_Bbm6mXihdYdazIfMF0eC6VFsOH4I65woeYxcPsqqQx8hkvKgIhhfp15fKgEgmuLdznaSuNBo7lFu8Qd-11aw.png?r=e03',
    'https://occ-0-2706-2705.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAAFJSe2el5rVnCVz5d1R8pnqYzBiXwEM7ooxTNY1LCrf6HzWO0RCORDzTO9IlOqpmCYCKIVyjPX5xMFw-RLz9WpqYvEg.png?r=93c',
    'https://occ-0-2706-2705.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAAFCz_FSu0kmLa1RfBpiB5zqib0M4vCeOHA8SuU5jS1N0kxaTCq-SorSSjWl__V3AgbE2Y_bprmaCsWnpIiqWcmKYHKA.png?r=b38',
    'https://occ-0-2706-2705.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAAFAGKflkOylk9Z_BiDV6S4DEibIvoi4Fwe8XSwM2WQWlziYTd5RUwB8dj0npKBMc2qGp6w9F-k3PX52WyaIZKWL4lng.png?r=fea',
  ];

  //Image Properties
  profileImages;
  totalImages;
  imageIndex: number = 0;
  imageRowCount: number = 6;
  lastImageRow;
  ImagesContainerTranslate: number = 0;

  @Output() changeProfileImage = new EventEmitter<any>();
  //#endregion

  constructor(
    private _navigationS: NavigationService,
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.getNavState();
  }

  ngOnDestroy(): void {
    this.navigation.unsubscribe();
  }

  //Initiate image navigation
  initImageNavigation() {
    this.initImageNavigationOnChange();
    this.images?.changes.subscribe((res) => {
      this.initImageNavigationOnChange(res);
    });
  }

  //Navigation Methods
  getNavState() {
    this.navigation = this._navigationS.navState.subscribe((data) => {
      data.id === VIEWS_IDS.CHANGE_PICTURE_MODAL ? this.handleNavAction(data.action) : null;
    });
  }

  openMenu() {
    this._navigationS.openMenu();
  }

  clickOnActiveCard() {
    this.elements.element.dispatchEvent(new Event('click'));
  }

  goBack() {
    this._navigationS.closeModal(MODALS_NAMES.CHANGE_PICTURE_MODAL)
  }

  handleNavAction(action: String) {
    switch (action) {
      case this._navigationS.navActions.NavInit:
        this.initImageNavigation();
        break;

      case this._navigationS.navActions.Enter:
        this.clickOnActiveCard();
        break;

      case this._navigationS.navActions.ArrowRight:
        this.nextImage();
        break;

      case this._navigationS.navActions.ArrowLeft:
        this.prevImage();
        break;

      case this._navigationS.navActions.ArrowUp:
        this.goImageUp();
        break;

      case this._navigationS.navActions.ArrowDown:
        this.goImageDown();
        break;

      case this._navigationS.navActions.Back:
        this.goBack();
        break;

      case this._navigationS.navActions.MenuClosed:
        break;

      default:
        break;
    }
  }

  //DOM manipulation image methods
  initImageNavigationOnChange(res?) {
    if (res) {
      this.profileImages = res?.toArray();
      this.setImageNavigation();
    } else {
      this.profileImages = this.images?.toArray();
      this.setImageNavigation();
    }
  }

  setImageNavigation() {
    this.totalImages = this.profileImages.length - 1;
    this.lastImageRow = this.totalImages - this.imageRowCount;
    this.goToImagesContainer();
  }

  parentIsImagesContainer() {
    if (this.elements.parent == this.imagesParent.nativeElement) {
      return true;
    }
  }

  nextImage() {
    if (this.imageIndex !== this.totalImages && this.elements.imageMod !== 5) {
      ++this.imageIndex;
      this.elements.blur();
      this.elements.element = this.profileImages[this.imageIndex].nativeElement;
      this.elements.focus();
  
      this.getImageModulo();
    }
  }

  prevImage() {    
    if (this.imageIndex !== 0 && this.elements.imageMod !== 0) {
      --this.imageIndex;
      this.elements.blur();
      this.elements.element = this.profileImages[this.imageIndex].nativeElement;
      this.elements.focus();
  
      this.getImageModulo();
    }
  }

  goImageDown() {
    if (this.imageIndex <= this.lastImageRow) {
      this.imageIndex += this.imageRowCount;
      this.ImagesContainerTranslate -= 26.65;
      this.ImagesContainerTranslate = Number(
        this.ImagesContainerTranslate.toFixed(2)
      );
  
      this.elements.blur();
      this.elements.element = this.profileImages[this.imageIndex].nativeElement;
      this.elements.focus();
    }
  }

  goImageUp() {
    if (this.imageIndex >= this.imageRowCount) {
      this.imageIndex -= this.imageRowCount;
      this.ImagesContainerTranslate += 26.65;
      this.ImagesContainerTranslate = Number(
        this.ImagesContainerTranslate.toFixed(2)
      );
  
      this.elements.blur();
      this.elements.element = this.profileImages[this.imageIndex].nativeElement;
      this.elements.focus();
    }
  }

  goToImagesContainer() {
    this.elements.blur();
    this.elements.parent = this.imagesParent.nativeElement;
    this.elements.element = this.profileImages[this.imageIndex].nativeElement;
    this.elements.focus();
  }

  getImageModulo() {
    this.elements.imageMod = this.imageIndex % this.imageRowCount;    
  }

  removeFocus() {
    this.elements.blur();
    this.elements.parent = null;
    this.elements.element = null;
    this.elements.imageMod = null;
  }

  //Change image methods
  changeImage(picture) {
    this.changeProfileImage.emit(picture)
    this.goBack();
  }

}
