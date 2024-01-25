import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { VIEWS_IDS } from '@app/services/navigation/Ids.config';
import { NavigationService } from '@app/services/navigation/navigation.service';
import { Subscription } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent implements OnInit, AfterViewInit, OnDestroy {

  //#region Declarations
  @ViewChild('cardsContainer', { static: true }) cardsContainer: ElementRef;
  @ViewChildren('card') cards?: QueryList<ElementRef>;
  
  private navigation!: Subscription;

  elements = {
    parent: null,
    element: null,
    cardMod: 0,

    focus() {
      return this.element?.classList.add('focused');
    },

    blur() {
      return this.element?.classList.remove('focused');
    },
  };

  cards_data: any;

  //Card Properties
  searchCards;
  totalCards;
  cardIndex: number = 0;
  cardRowCount: number = 6;
  lastCardRow;
  cardsContainerTranslate: number = 0;
  //#endregion

  constructor(
    private _navigationS: NavigationService,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.getAllList();
  }

  ngAfterViewInit(): void {
    this.getNavState();
  }

  ngOnDestroy(): void {
    this.navigation.unsubscribe();
  }

  //Initiate card navigation
  initCardNavigation() {
    this.initCardNavigationOnChange();
    this.cards?.changes.subscribe((res) => {
      this.initCardNavigationOnChange(res);
    });
  }

  //Navigation Methods
  getNavState() {
    this.navigation = this._navigationS.navState.subscribe((data) => {
      data.id === VIEWS_IDS.MY_LIST
        ? this.handleNavAction(data.action)
        : null;
    });
  }

  openMenu() {
    this._navigationS.openMenu();
  }

  clickOnActiveCard() {
    this.elements.element?.dispatchEvent(new Event('click'));
  }

  goToVideo(videoId?, videoType?) {
    this._navigationS.goToVideo(videoId, videoType);
  }

  handleNavAction(action: String) {
    switch (action) {
      case this._navigationS.navActions.NavInit:
        this.initCardNavigation();
      break;

      case this._navigationS.navActions.Enter:
        this.clickOnActiveCard();
      break;

      case this._navigationS.navActions.ArrowRight:
        this.nextCard();
      break;

      case this._navigationS.navActions.ArrowLeft:
        if (this.elements.cardMod == 0) {
          this.openMenu();
        } else {
          this.prevCard();
        }
      break;

      case this._navigationS.navActions.ArrowUp:
        this.goCardUp();
      break;

      case this._navigationS.navActions.ArrowDown:
        this.goCardDown();
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

  //DOM manipulation card methods
  initCardNavigationOnChange(res?) {
    if (res) {
      this.searchCards = res?.toArray();
      this.setCardNavigation();
    } else {
      this.searchCards = this.cards?.toArray();
      this.setCardNavigation();
    }
  }

  setCardNavigation() {
    this.totalCards = this.searchCards.length - 1;
    this.lastCardRow = this.totalCards - this.cardRowCount;
    this.goToCardsContainer();
  }

  parentIsCardsContainer() {
    if (this.elements.parent == this.cardsContainer?.nativeElement) {
      return true;
    }
  }

  nextCard() {
    if (this.cardIndex !== this.totalCards && this.elements.cardMod !== 5) {
      ++this.cardIndex;
      this.elements.blur();
      this.elements.element = this.searchCards[this.cardIndex]?.nativeElement;
      this.elements.focus();
  
      this.getCardModulo();
    }
  }

  prevCard() {
    if (this.cardIndex !== 0 && this.elements.cardMod !== 0) {
      --this.cardIndex;
      this.elements.blur();
      this.elements.element = this.searchCards[this.cardIndex]?.nativeElement;
      this.elements.focus();
  
      this.getCardModulo();
    }
  }

  goCardDown() {
    if (this.cardIndex <= this.lastCardRow) {
      this.cardIndex += this.cardRowCount;
      this.cardsContainerTranslate -= 37.5;
      this.cardsContainerTranslate = Number(
        this.cardsContainerTranslate.toFixed(2)
      );
  
      this.elements.blur();
      this.elements.element = this.searchCards[this.cardIndex]?.nativeElement;
      this.elements.focus();
    }
  }

  goCardUp() {
    if (this.cardIndex >= this.cardRowCount) {
      this.cardIndex -= this.cardRowCount;
      this.cardsContainerTranslate += 37.5;
      this.cardsContainerTranslate = Number(
        this.cardsContainerTranslate.toFixed(2)
      );
  
      this.elements.blur();
      this.elements.element = this.searchCards[this.cardIndex]?.nativeElement;
      this.elements.focus();
    }
  }

  goToCardsContainer() {
    this.elements.blur();
    this.elements.parent = this.cardsContainer?.nativeElement;
    this.elements.element = this.searchCards[this.cardIndex]?.nativeElement;
    this.elements.focus();
  }

  getCardModulo() {
    this.elements.cardMod = this.cardIndex % this.cardRowCount;    
  }

  removeFocus() {
    this.elements.blur();
    this.elements.parent = null;
    this.elements.element = null;
    this.elements.cardMod = null;
  }

  //My list methods
  getAllList() {
    this.cards_data = this.localStorage.getMyList();    
  }

}
