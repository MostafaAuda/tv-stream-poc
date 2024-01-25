import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { MODALS_NAMES, VIEWS_IDS } from '@app/services/navigation/Ids.config';
import { NavigationService } from '@app/services/navigation/navigation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-subtitle-modal',
  templateUrl: './subtitle-modal.component.html',
  styleUrls: ['./subtitle-modal.component.scss']
})
export class SubtitleModalComponent implements OnInit, AfterViewInit, OnDestroy {

  //#region Declarations
  @ViewChildren('item') items?: QueryList<ElementRef>;
  @Output() changeTrack = new EventEmitter<any>();

  private navigation!: Subscription;

  elements = {
    element: null,

    focus() {
      return this.element?.classList.add('focused');
    },

    blur() {
      return this.element?.classList.remove('focused');
    },
  };

  subtitiles;
  audios = [
    {
      audio: 'English',
      active: true,
    },
    {
      audio: 'Arabic',
      active: false,
    },
    {
      audio: 'French',
      active: false,
    },
  ];

  //Item Properties
  subtitleItems;
  totalItems;
  itemIndex: number = 0;
  //#endregion

  constructor(
    private _navigationS: NavigationService,
  ) { }

  ngOnInit(): void {
    this.addOffOptionToSubtitles();    
  }

  ngAfterViewInit(): void {
    this.getNavState();
  }

  ngOnDestroy(): void {
    this.navigation.unsubscribe();
  }

  //Initiate item navigation
  initItemNavigation() {
    this.initItemNavigationOnChange();
    this.items?.changes.subscribe((res) => {
      this.initItemNavigationOnChange(res);
    });
  }

  //Navigation Methods
  getNavState() {
    this.navigation = this._navigationS.navState.subscribe((data) => {
      data.id === VIEWS_IDS.SUBTITLE_MODAL
        ? this.handleNavAction(data.action)
        : null;
    });
  }

  clickOnActiveCard() {
    this.elements.element.dispatchEvent(new Event('click'));
  }

  handleNavAction(action: String) {
    switch (action) {
      case this._navigationS.navActions.NavInit:
        this.initItemNavigation();
      break;

      case this._navigationS.navActions.Enter:
        this.clickOnActiveCard();
      break;

      case this._navigationS.navActions.ArrowRight:
      break;

      case this._navigationS.navActions.ArrowLeft:
      break;

      case this._navigationS.navActions.ArrowUp:
        this.prevItem();
      break;

      case this._navigationS.navActions.ArrowDown:
        this.nextItem()
      break;

      case this._navigationS.navActions.Back:
        this._navigationS.closeModal(MODALS_NAMES.SUBTITLE_MODAL)
      break;

      case this._navigationS.navActions.MenuClosed:
      break;

      default:
      break;
    }
  }

  //DOM manipulation image methods
  initItemNavigationOnChange(res?) {
    if (res) {
      this.subtitleItems = res?.toArray();
      this.setItemNavigation();
    } else {
      this.subtitleItems = this.items?.toArray();
      this.setItemNavigation();
    }
  }

  setItemNavigation() {
    this.totalItems = this.subtitleItems.length - 1;
    this.elements.blur();
    this.elements.element = this.subtitleItems[this.itemIndex].nativeElement;
    this.elements.focus();
  }

  nextItem() {
    if (this.itemIndex !== this.totalItems) {
      ++this.itemIndex;
      this.elements.blur();
      this.elements.element = this.subtitleItems[this.itemIndex].nativeElement;
      this.elements.focus();
    }
  }

  prevItem() {    
    if (this.itemIndex !== 0) {
      --this.itemIndex;
      this.elements.blur();
      this.elements.element = this.subtitleItems[this.itemIndex].nativeElement;
      this.elements.focus();
    }
  }

  //Subtitle methods
  addOffOptionToSubtitles () {
    this.subtitiles = [
      {
        label: 'English',
        srclang: 'en',
        active: false,
        src: 'assets/subtitles/en.vtt'
      },
      {
        label: ' Deutsch',
        srclang: 'de',
        active: false,
        src: 'assets/subtitles/de.vtt'
      },
      {
        label: 'Français',
        srclang: 'fr',
        active: false,
        src: 'assets/subtitles/fr.vtt'
      },
    ];

    let offOption = {
      label: 'Off',
      srclang: 'off',
      active: false,
    }

    this.subtitiles.unshift(offOption);    
  }

  changeCurrentSubtitle(srclang) {   
    this.changeTrack.emit(srclang);
  }

  changeAudio() {
  
  }
}
