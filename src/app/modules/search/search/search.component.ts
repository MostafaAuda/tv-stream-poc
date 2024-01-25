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
import { VIEWS_IDS } from '@app/services/navigation/Ids.config';
import { NavigationService } from '@app/services/navigation/navigation.service';
import { Subscription } from 'rxjs';
import * as JsSearch from 'js-search';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy {
  //#region Declarations
  @ViewChild('keyboard', { static: true }) keyboard: ElementRef;
  @ViewChild('keyboardActions', { static: true }) keyboardActions: ElementRef;
  @ViewChild('spaceKey', { static: true }) spaceKey: ElementRef;
  @ViewChildren('key') keys?: QueryList<ElementRef>;

  @ViewChild('cardsContainer', { static: true }) cardsContainer: ElementRef;
  @ViewChildren('card') cards?: QueryList<ElementRef>;

  @ViewChild('suggestionsContainer', { static: true })
  suggestionsContainer: ElementRef;
  @ViewChildren('suggestion') suggestions?: QueryList<ElementRef>;

  private navigation!: Subscription;
  //init search
  search = new JsSearch.Search('name');
 

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

  cards_data = [
    {
      name: "spider-man-no-way-home",
      img: 'https://cdn.shopify.com/s/files/1/0057/3728/3618/products/spider-man-no-way-home_l1mupilp_480x.progressive.jpg?v=1640203988',
      tags:['action', 'adventure'],
      id:1,
      type:'movie'
    },
    {
      name: "lucifer",
      img: "https://wallpaperaccess.com/full/6151633.jpg",
      tags:["crime","fantasy"],
      id:2,
      type:'series'
    },
    {
      name: "",
      img: 'https://github.com/MostafaAuda/personal-uploads/blob/main/movies/movie1.webp?raw=true',
      tags:[]
    },
    {
      name: "",
      img: 'https://github.com/MostafaAuda/personal-uploads/blob/main/movies/movie2.webp?raw=true',
      tags:[]
    },
    {
      name: "",
      img: 'https://github.com/MostafaAuda/personal-uploads/blob/main/movies/movie3.webp?raw=true',
      tags:[]
    },
    {
      name: "",
      img: 'https://github.com/MostafaAuda/personal-uploads/blob/main/movies/movie4.webp?raw=true',
      tags:[]
    },
    {
      name: "",
      img: 'https://github.com/MostafaAuda/personal-uploads/blob/main/movies/movie5.webp?raw=true',
      tags:[]
    },
    {
      name: "",
      img: 'https://github.com/MostafaAuda/personal-uploads/blob/main/movies/movie24.webp?raw=true',
      tags:[]
    },
    {
      name: "",
      img: 'https://github.com/MostafaAuda/personal-uploads/blob/main/movies/movie7.webp?raw=true',
      tags:[]
    },
    {
      name: "",
      img: 'https://github.com/MostafaAuda/personal-uploads/blob/main/movies/movie8.webp?raw=true',
      tags:[]
    },
    {
      name: "",
      img: 'https://github.com/MostafaAuda/personal-uploads/blob/main/movies/movie9.webp?raw=true',
      tags:[]
    },
    {
      name: "",
      img: 'https://github.com/MostafaAuda/personal-uploads/blob/main/movies/movie10.webp?raw=true',
      tags:[]
    },
    {
      name: "",
      img: 'https://github.com/MostafaAuda/personal-uploads/blob/main/movies/movie11.webp?raw=true',
      tags:[]
    },
    {
      name: "",
      img: 'https://github.com/MostafaAuda/personal-uploads/blob/main/movies/movie12.webp?raw=true',
      tags:[]
    },
    {
      name: "",
      img: 'https://github.com/MostafaAuda/personal-uploads/blob/main/movies/movie13.webp?raw=true',
      tags:[]
    },
    {
      name: "",
      img: 'https://github.com/MostafaAuda/personal-uploads/blob/main/movies/movie14.webp?raw=true',
      tags:[]
    },
    {
      name: "",
      img: 'https://github.com/MostafaAuda/personal-uploads/blob/main/movies/movie15.webp?raw=true',
      tags:[]
    },
    {
      name: "",
      img: 'https://github.com/MostafaAuda/personal-uploads/blob/main/movies/movie16.webp?raw=true',
      tags:[]
    },
    {
      name: "",
      img: 'https://github.com/MostafaAuda/personal-uploads/blob/main/movies/movie17.webp?raw=true',
      tags:[]
    },
    {
      name: "",
      img: 'https://github.com/MostafaAuda/personal-uploads/blob/main/movies/movie18.webp?raw=true',
      tags:[]
    },
    {
      name: "",
      img: 'https://github.com/MostafaAuda/personal-uploads/blob/main/movies/movie19.webp?raw=true',
      tags:[]
    },
    {
      name: "",
      img: 'https://github.com/MostafaAuda/personal-uploads/blob/main/movies/movie20.webp?raw=true',
      tags:[]
    },
    {
      name: "",
      img: 'https://github.com/MostafaAuda/personal-uploads/blob/main/movies/movie21.webp?raw=true',
      tags:[]
    },
    {
      name: "",
      img: 'https://github.com/MostafaAuda/personal-uploads/blob/main/movies/movie22.webp?raw=true',
      tags:[]
    },
    {
      name: "",
      img: 'https://github.com/MostafaAuda/personal-uploads/blob/main/movies/movie23.webp?raw=true',
      tags:[]
    },
  ];

  suggestions_data = [
    'Inception',
    'Dark knight rises',
    'Spider Man: No way home',
    'Friends',
    'Pirates of caribbean',
    'Scream',
    'Iron Man',
    'Harry Potter',
    'Death on the nile',
    'Encanto',
    'Secrets of dumbledore',
    'Sonic 2',
    'Outfit',
    'Uncharted',
    'Minions',
    'FireHeart',
    'You wont be alone',
  ];

  searchResult: [];
  shuffledSuggestions: [];

  //Keyboard Properties
  keyboardKeys;
  totalKeys;
  keyIndex: number = 0;
  keyboardRowCount: number = 6;
  keyboardLastRow;

  //Card Properties
  searchCards;
  totalCards;
  cardIndex: number = 0;
  cardRowCount: number = 5;
  lastCardRow;
  cardsContainerTranslate: number = 0;

  //Suggestions Properties
  searchSuggestions;
  totalSuggestions;
  suggestionIndex: number = 0;
  suggestionsContainerTranslate: number = 0;

  elements = {
    parent: null,
    element: null,
    keyMod: null,
    cardMod: null,

    focus() {
      return this.element?.classList.add('focused');
    },

    blur() {
      return this.element?.classList.remove('focused');
    },
  };

  compineText: any[] = [];
  searchText: string;
  showArLang: boolean = false;
  //#endregion

  constructor(
    private _navigationS: NavigationService,
  ) { }

  ngOnInit(): void {
    this.searchResult = this.shuffleArray(this.cards_data);
  }

  ngAfterViewInit(): void {
    this.getNavState();
    this.initSearch()
  }

  ngOnDestroy(): void {
    this.navigation.unsubscribe();
  }

  initSearch() {
    this.search.indexStrategy = new JsSearch.AllSubstringsIndexStrategy();
    this.search.addIndex('name');
    this.search.addIndex('tags')
    this.search.addDocuments(this.cards_data);
  }

  //Initiate Keyboard
  initKeyboardKeys() {
    this.initKeyboardBasedOnLang();
    this.keys?.changes.subscribe((res) => {
      this.initKeyboardBasedOnLang(res);
    });
  }

  //Initiate card navigation
  initCardNavigation() {
    this.initCardNavigationOnChange();
    this.cards?.changes.subscribe((res) => {
      this.initCardNavigationOnChange(res);
    });
  }

  //Initiate suggestions navigation
  initSuggestionNavigation() {
    this.initSuggestionNavigationOnChange();
    this.suggestions?.changes.subscribe((res) => {
      this.initSuggestionNavigationOnChange(res);
    });
  }

  //Navigation Methods
  getNavState() {
    this.navigation = this._navigationS.navState.subscribe((data) => {
      data.id === VIEWS_IDS.SEARCH ? this.handleNavAction(data.action) : null;
    });
  }

  openMenu() {
    this._navigationS.openMenu();
  }

  goToVideo(videoId?,type?) {
    this._navigationS.goToVideo(videoId,type);
  }

  handleNavAction(action: String) {
    switch (action) {
      case this._navigationS.navActions.NavInit:
        this.initKeyboardKeys();
        this.initCardNavigation();
        this.initSuggestionNavigation();
        break;

      case this._navigationS.navActions.Enter:
        this.elements.element.dispatchEvent(new Event('click'));
        break;

      case this._navigationS.navActions.ArrowRight:
        if (this.parentIsKeyboard()) {
          (this.keyIndex == this.totalKeys || this.elements.keyMod == 5) && this.searchResult
            ? this.goToCardsContainer()
            : this.nextKey();
        } else if (this.parentIsCardsContainer()) {
          this.nextCard();
        }

        if (this.parentIsActions() && !this.isLastChild()) {
          this.nextChild();
        } else if (this.parentIsActions() && this.isLastChild() && this.searchResult) {
          this.goToCardsContainer();
        }

        if (this.parentIsSuggestionsContainer() && this.searchResult) {
          this.goToCardsContainer();
        }
        break;

      case this._navigationS.navActions.ArrowLeft:
        if (this.parentIsKeyboard()) {
          if (this.keyIndex == 0 || this.elements.keyMod == 0) {
            this.openMenu();
          } else {
            this.prevKey();
          }
        } else if (this.parentIsCardsContainer()) {
          if (this.elements.cardMod == 0) {
            this.goToKeyboard();
          } else {
            this.prevCard();
          }
        }

        if (this.parentIsActions() && !this.isFirstChild()) {
          this.prevChild();
        } else if (this.parentIsActions() && this.isFirstChild()) {
          this.openMenu();
        }

        if (this.parentIsSuggestionsContainer()) {
          this.openMenu();
        }
        break;

      case this._navigationS.navActions.ArrowUp:
        if (this.parentIsSuggestionsContainer()) {
          if (this.suggestionIndex == 0) {
            this.setActionsKeys();
          } else {
            this.prevSuggestion();
          }
        } else if (this.parentIsActions()) {
          this.goToKeyboard();
        } else if (this.parentIsKeyboard()) {
          this.goKeyUp();
        }

        if (this.parentIsCardsContainer()) {
          this.goCardUp();
        }
        break;

      case this._navigationS.navActions.ArrowDown:
        if (this.parentIsKeyboard()) {
          if (this.keyIndex > this.keyboardLastRow) {
            this.setActionsKeys();
          } else {
            this.goKeyDown();
          }
        } else if (this.parentIsActions()) {
          this.goToSuggestionsContainer();
        } else if (this.parentIsSuggestionsContainer()) {
          this.nextSuggestion();
        }

        if (this.parentIsCardsContainer()) {
          this.goCardDown();
        }
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
    if (this.keyIndex != 0) {
      --this.keyIndex;
    }

    this.elements.blur();
    this.elements.element = this.keyboardKeys[this.keyIndex].nativeElement;
    this.elements.focus();

    this.getKeyModulo();
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

  goToKeyboard() {
    this.elements.blur();
    this.elements.parent = this.keyboard.nativeElement;
    this.elements.element = this.keyboardKeys[this.keyIndex].nativeElement;
    this.elements.focus();
  }

  getKeyModulo() {
    this.elements.keyMod = this.keyIndex % this.keyboardRowCount;
  }

  //DOM manipulation keyboard actions methods
  setActionsKeys() {
    this.elements.blur();
    this.elements.parent = this.keyboardActions.nativeElement;
    this.elements.element = this.spaceKey.nativeElement;
    this.elements.focus();
  }

  parentIsActions() {
    if (this.elements.parent == this.keyboardActions.nativeElement) {
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
    this.elements.blur();
    this.elements.element = this.elements.element.nextElementSibling;
    this.elements.focus();
  }

  prevChild() {
    this.elements.blur();
    this.elements.element = this.elements.element.previousElementSibling;
    this.elements.focus();
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
  }

  parentIsCardsContainer() {
    if (this.elements.parent == this.cardsContainer.nativeElement) {
      return true;
    }
  }

  nextCard() {
    if (this.cardIndex !== this.totalCards && this.elements.cardMod !== 4) {
      ++this.cardIndex;
      this.elements.blur();
      this.elements.element = this.searchCards[this.cardIndex].nativeElement;
      this.elements.focus();

      this.getCardModulo();
    }
  }

  prevCard() {
    if (this.cardIndex !== 0 && this.elements.cardMod !== 0) {
      --this.cardIndex;
      this.elements.blur();
      this.elements.element = this.searchCards[this.cardIndex].nativeElement;
      this.elements.focus();

      this.getCardModulo();
    }
  }

  goCardDown() {
    if (this.cardIndex <= this.lastCardRow) {
      this.cardIndex += this.cardRowCount;
      this.cardsContainerTranslate -= 34.76;
      this.cardsContainerTranslate = Number(
        this.cardsContainerTranslate.toFixed(2)
      );

      this.elements.blur();
      this.elements.element = this.searchCards[this.cardIndex].nativeElement;
      this.elements.focus();
    }
  }

  goCardUp() {
    if (this.cardIndex >= this.cardRowCount) {
      this.cardIndex -= this.cardRowCount;
      this.cardsContainerTranslate += 34.76;
      this.cardsContainerTranslate = Number(
        this.cardsContainerTranslate.toFixed(2)
      );

      this.elements.blur();
      this.elements.element = this.searchCards[this.cardIndex].nativeElement;
      this.elements.focus();
    }
  }

  goToCardsContainer() {
    this.elements.blur();
    this.elements.parent = this.cardsContainer.nativeElement;
    this.elements.element = this.searchCards[this.cardIndex].nativeElement;
    this.elements.focus();
  }

  getCardModulo() {
    this.elements.cardMod = this.cardIndex % this.cardRowCount;
  }

  //DOM manipulation suggestion methods
  initSuggestionNavigationOnChange(res?) {
    if (res) {
      this.searchSuggestions = res?.toArray();
      this.setSuggestionNavigation();
    } else {
      this.searchSuggestions = this.suggestions?.toArray();
      this.setSuggestionNavigation();
    }
  }

  setSuggestionNavigation() {
    this.totalSuggestions = this.searchSuggestions.length - 1;
  }

  parentIsSuggestionsContainer() {
    if (this.elements.parent == this.suggestionsContainer.nativeElement) {
      return true;
    }
  }

  nextSuggestion() {
    if (this.suggestionIndex !== this.totalSuggestions) {
      ++this.suggestionIndex;
      this.suggestionsContainerTranslate -= 5;
      this.elements.blur();
      this.elements.element =
        this.searchSuggestions[this.suggestionIndex].nativeElement;
      this.elements.focus();
    }
  }

  prevSuggestion() {
    if (this.suggestionIndex != 0) {
      --this.suggestionIndex;
      this.suggestionsContainerTranslate += 5;
      this.elements.blur();
      this.elements.element =
        this.searchSuggestions[this.suggestionIndex].nativeElement;
      this.elements.focus();
    }
  }

  goToSuggestionsContainer() {
    if (this.shuffledSuggestions) {
      this.elements.blur();
      this.elements.parent = this.suggestionsContainer.nativeElement;
      this.elements.element =
        this.searchSuggestions[this.suggestionIndex].nativeElement;
      this.elements.focus();
    }
  }

  removeFocus() {
    this.elements.blur();
    this.elements.parent = null;
    this.elements.element = null;
    this.elements.keyMod = null;
    this.elements.cardMod = null;
  }

  //Search Methods
  copyText(text) {
    this.compineText.push(text);

    this.runSearch();
  }

  deleteText() {
    this.compineText.pop();

    this.runSearch();
  }

  addSpace() {
    var checkIfSpace = this.compineText[this.compineText.length - 1];

    if (checkIfSpace === ' ') {
      return;
    } else {
      this.compineText.push(' ');

      this.runSearch();
    }
  }

  switchLang() {
    this.showArLang = !this.showArLang;
  }

  shuffleArray(array) {
    var m = array.length,
      t,
      i;

    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }

  runSearch() {
    this.searchText = this.compineText.join('');
    this.searchResult = this.search.search(this.searchText).length ? this.search.search(this.searchText) : this.shuffleArray(this.cards_data);
    if (this.searchText) {
      this.shuffledSuggestions = this.shuffleArray(this.suggestions_data);
    } else {
      this.shuffledSuggestions = null;
    }
  }
}
