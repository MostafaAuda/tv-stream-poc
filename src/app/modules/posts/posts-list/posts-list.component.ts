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
import { NavigationService } from '@app/services/navigation/navigation.service';
import { VIEWS_IDS } from './../../../core/services/navigation/Ids.config';
import { Subscription } from 'rxjs';
import videojs from 'video.js';
// import { NAV_SETTINGS } from '@app/services/navigation/nav.settings';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit, AfterViewInit, OnDestroy {
  //#region Declarations
  @ViewChildren('horizontalSlider') horizontals?: QueryList<ElementRef>;
  @ViewChild('videoJS') videoJS: ElementRef;

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

  //Vertical Sliders Properties
  horizontalSliders;
  totalHorizontalSliders;
  horizontalSlideIndex: number = 0;
  verticalTranslate: number = 0;

  //Horizontal Sliders Properties
  sliderCards;
  totalSliderCards;
  sliderCardIndex: number;
  horizontalTranslate: number;

  translateValue: number;

  homeResponse = [
    {
      category_name: 'Popular on ShuffleTV',
      category_cards: [
        {
          image:
            'https://cdn.shopify.com/s/files/1/0057/3728/3618/products/spider-man-no-way-home_l1mupilp_480x.progressive.jpg?v=1640203988',
          logo: 'assets/images/logo.webp',
          tag: 'New',
          id: 1,
          type: 'movie'
        },
        {
          image:
            'https://movieposters2.com/images/1376417-b.jpg',
          logo: '',
          tag: '',
          id: 2,
          type: 'series'
        },
        {
          image:
            'https://github.com/MostafaAuda/personal-uploads/blob/main/movies/movie1.webp?raw=true',
          logo: 'assets/images/logo.webp',
          tag: 'New',
          id: 1,
          type: 'movie'
        },
        {
          image:
            'https://github.com/MostafaAuda/personal-uploads/blob/main/movies/movie2.webp?raw=true',
          logo: '',
          tag: '',
          id: 2,
          type: 'series'
        },
        {
          image:
            'https://github.com/MostafaAuda/personal-uploads/blob/main/movies/movie3.webp?raw=true',
          logo: 'assets/images/logo.webp',
          tag: 'New',
          id: 1,
          type: 'movie'
        },
        {
          image:
            'https://github.com/MostafaAuda/personal-uploads/blob/main/movies/movie4.webp?raw=true',
          logo: '',
          tag: '',
          id: 2,
          type: 'series'
        },
        {
          image:
            'https://github.com/MostafaAuda/personal-uploads/blob/main/movies/movie5.webp?raw=true',
          logo: 'assets/images/logo.webp',
          tag: 'New',
          id: 1,
          type: 'movie'
        },
        {
          image:
            'https://github.com/MostafaAuda/personal-uploads/blob/main/movies/movie7.webp?raw=true',
          logo: '',
          tag: '',
          id: 2,
          type: 'series'
        },
      ],
    },
    {
      category_name: 'Trending Now',
      category_cards: [
        {
          image:
            'https://github.com/MostafaAuda/personal-uploads/blob/main/movies/movie8.webp?raw=true',
          logo: 'assets/images/logo.webp',
          tag: 'New',
          id: 1,
          type: 'movie'
        },
        {
          image:
            'https://github.com/MostafaAuda/personal-uploads/blob/main/movies/movie9.webp?raw=true',
          logo: '',
          tag: '',
          id: 2,
          type: 'series'
        },
        {
          image:
            'https://github.com/MostafaAuda/personal-uploads/blob/main/movies/movie10.webp?raw=true',
          logo: 'assets/images/logo.webp',
          tag: 'New',
          id: 1,
          type: 'movie'
        },
        {
          image:
            'https://github.com/MostafaAuda/personal-uploads/blob/main/movies/movie11.webp?raw=true',
          logo: '',
          tag: '',
          id: 2,
          type: 'series'
        },
        {
          image:
            'https://github.com/MostafaAuda/personal-uploads/blob/main/movies/movie12.webp?raw=true',
          logo: 'assets/images/logo.webp',
          tag: 'New',
          id: 1,
          type: 'movie'
        },
        {
          image:
            'https://github.com/MostafaAuda/personal-uploads/blob/main/movies/movie13.webp?raw=true',
          logo: '',
          tag: '',
          id: 2,
          type: 'series'
        },
        {
          image:
            'https://github.com/MostafaAuda/personal-uploads/blob/main/movies/movie14.webp?raw=true',
          logo: 'assets/images/logo.webp',
          tag: 'New',
          id: 1,
          type: 'movie'
        },
        {
          image:
            'https://github.com/MostafaAuda/personal-uploads/blob/main/movies/movie15.webp?raw=true',
          logo: '',
          tag: '',
          id: 2,
          type: 'series'
        },
      ],
    },
    {
      category_name: 'Top 10 in Egypt Today',
      category_cards: [
        {
          image:
            'https://github.com/MostafaAuda/personal-uploads/blob/main/movies/movie16.webp?raw=true',
          logo: 'assets/images/logo.webp',
          tag: 'New',
          id: 1,
          type: 'movie'
        },
        {
          image:
            'https://github.com/MostafaAuda/personal-uploads/blob/main/movies/movie17.webp?raw=true',
          logo: '',
          tag: '',
          id: 2,
          type: 'series'
        },
        {
          image:
            'https://github.com/MostafaAuda/personal-uploads/blob/main/movies/movie18.webp?raw=true',
          logo: 'assets/images/logo.webp',
          tag: 'New',
          id: 1,
          type: 'movie'
        },
        {
          image:
            'https://github.com/MostafaAuda/personal-uploads/blob/main/movies/movie19.webp?raw=true',
          logo: '',
          tag: '',
          id: 2,
          type: 'series'
        },
        {
          image:
            'https://github.com/MostafaAuda/personal-uploads/blob/main/movies/movie20.webp?raw=true',
          logo: 'assets/images/logo.webp',
          tag: 'New',
          id: 1,
          type: 'movie'
        },
        {
          image:
            'https://github.com/MostafaAuda/personal-uploads/blob/main/movies/movie21.webp?raw=true',
          logo: '',
          tag: '',
          id: 2,
          type: 'series'
        },
        {
          image:
            'https://github.com/MostafaAuda/personal-uploads/blob/main/movies/movie22.webp?raw=true',
          logo: 'assets/images/logo.webp',
          tag: 'New',
          id: 1,
          type: 'movie'
        },
        {
          image:
            'https://github.com/MostafaAuda/personal-uploads/blob/main/movies/movie23.webp?raw=true',
          logo: '',
          tag: '',
          id: 2,
          type: 'series'
        },
      ],
    },
  ];

  videoData: VideoResponse;

  spider_man: VideoResponse = {
    id: 1,
    type: 'movie',
    preview_url: 'https://github.com/MostafaAuda/personal-uploads/blob/main/spider-man.mp4?raw=true',
    background: 'https://wallpaperaccess.com/full/242860.jpg',
    logo: 'https://i.pinimg.com/originals/78/68/83/786883530f5eb6e04dbef2fb59106300.png',
    year: '2021',
    adult_rate: 'PG-13',
    length: '2hr 28min',
    total_seasons: null,
    resolution: '4K',
    categories: ['Action', 'Adventure'],
    flag: 'Only On ShuffleTV',
    name: 'Spider-Man: No Way Home',
    description:
      'With Spider-Mans identity now revealed, Peter asks Doctor Strange for help, When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man',
    imdb_rate: 9.2,
    current_state: {
      season: null,
      episode: null,
      current_time: 34,
      time_left: '34:50',
    },
  };

  lucifer: VideoResponse = {
    id: 2,
    type: 'series',
    preview_url: 'https://github.com/MostafaAuda/personal-uploads/blob/main/lucifer.mp4?raw=true',
    background: 'https://wallpaperaccess.com/full/6151633.jpg',
    logo: 'https://www.pngkit.com/png/full/314-3149696_lucifer-image-lucifer-serie-logo-png.png',
    year: '2021',
    adult_rate: '16+',
    length: null,
    total_seasons: '6 Seasons',
    resolution: 'HD',
    categories: ['Crime', 'Fantacy'],
    flag: 'Only On EtisalatTV',
    name: 'Lucifer',
    description:
      'Lucifer Morningstar has decided hes had enough of being the dutiful servant in Hell and decides to spend some time on Earth to better understand humanity. He settles in Los Angeles - the City of Angels',
    imdb_rate: 8.2,
    current_state: {
      season: 1,
      episode: 4,
      current_time: 34,
      time_left: '34:50',
    },
  };

  player: videojs.Player;

  playerOptions = {
    autoplay: false,
    controls: false,
    preload: 'auto',
  };

  is_previewPlaying: boolean = false;
  previewDelay: boolean = false;
  videoPrev: NodeJS.Timeout;
  //#endregion

  constructor(
    private _navigationS: NavigationService,
  ) { }

  ngOnInit() {
    this.videoData = this.spider_man;
  }

  ngAfterViewInit(): void {
    this.getNavState();
    this.initPlayer();
  }

  ngOnDestroy(): void {
    this.clearVideoPrevTimer();
    //destroy the player
    this.player.dispose();
    this.navigation.unsubscribe();
  }

  //Initiate cards navigation
  initCardNavigation() {
    this.sliderCards = this.elements.parent?.querySelectorAll('.slider-slide');
    this.setCardNavigation();
  }

  //Initiate horizontal navigation
  initHorizontalNavigation() {
    this.initHorizontalNavigationOnChange();
    this.horizontals?.changes.subscribe((res) => {
      this.initHorizontalNavigationOnChange(res);
    });
  }

  getNavState() {
    this.navigation = this._navigationS.navState.subscribe((data) => {
      this.translateValue = data.homeTranslateValue;
      data.id === VIEWS_IDS.HOME ? this.handleNavAction(data.action) : null;
    });
  }

  openMenu() {
    this._navigationS.openMenu();
  }

  goToVideo(videoId, videoType) {
    this._navigationS.goToVideo(videoId, videoType);
  }

  clickOnActiveCard() {
    this.elements.element.dispatchEvent(new Event('click'));
  }

  handleNavAction(action: String) {
    switch (action) {
      case this._navigationS.navActions.NavInit:
        this.initHorizontalNavigation();
        break;

      case this._navigationS.navActions.Enter:
        this.clickOnActiveCard();
        break;

      case this._navigationS.navActions.ArrowRight:
        this.nextCard();
        break;

      case this._navigationS.navActions.ArrowLeft:
        this.prevCard();
        break;

      case this._navigationS.navActions.ArrowUp:
        this.prevHorizontal();
        break;

      case this._navigationS.navActions.ArrowDown:
        this.nextHorizontal();
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

  //DOM Manipulation Horizontal Methods
  initHorizontalNavigationOnChange(res?) {
    if (res) {
      this.horizontalSliders = res?.toArray();
      this.totalHorizontalSliders = this.horizontalSliders.length - 1;

      this.setHorizontalNavigation();
    } else {
      this.horizontalSliders = this.horizontals?.toArray();
      this.totalHorizontalSliders = this.horizontalSliders.length - 1;

      this.setHorizontalNavigation();
    }
  }

  setHorizontalNavigation() {
    this.elements.parent =
      this.horizontalSliders[this.horizontalSlideIndex].nativeElement;
    this.sliderCardIndex = this.elements.parent.getAttribute('cardIndex');
    this.horizontalTranslate = this.elements.parent.getAttribute('translate');
    this.horizontalTranslate = Number(this.horizontalTranslate);

    //Init Cards after horizontal slider
    this.initCardNavigation();
  }

  nextHorizontal() {
    if (this.horizontalSlideIndex != this.totalHorizontalSliders) {
      ++this.horizontalSlideIndex;
      this.verticalTranslate -= 41;
      this.setHorizontalNavigation();
    }
  }

  prevHorizontal() {
    if (this.horizontalSlideIndex != 0) {
      --this.horizontalSlideIndex;
      this.verticalTranslate += 41;
      this.setHorizontalNavigation();
    }
  }

  //DOM Manipulation Cards Methods
  setCardNavigation() {
    this.totalSliderCards = this.sliderCards.length - 1;

    this.elements.blur();
    this.elements.element = this.sliderCards[this.sliderCardIndex];
    this.elements.focus();

    this.getCardData();
  }

  nextCard() {
    if (this.sliderCardIndex != this.totalSliderCards) {
      ++this.sliderCardIndex;
      this.horizontalTranslate -= this.translateValue;
      this.horizontalTranslate = Number(this.horizontalTranslate.toFixed(2));

      this.elements.parent.setAttribute('cardIndex', this.sliderCardIndex);
      this.elements.parent.setAttribute('translate', this.horizontalTranslate);

      this.translateHorizontal(this.horizontalTranslate);

      this.elements.blur();
      this.elements.element = this.sliderCards[this.sliderCardIndex];
      this.elements.focus();

      this.getCardData();
    }
  }

  prevCard() {
    if (this.sliderCardIndex != 0) {
      --this.sliderCardIndex;
      this.horizontalTranslate += this.translateValue;
      this.horizontalTranslate = Number(this.horizontalTranslate.toFixed(2));

      this.elements.parent.setAttribute('cardIndex', this.sliderCardIndex);
      this.elements.parent.setAttribute('translate', this.horizontalTranslate);

      this.translateHorizontal(this.horizontalTranslate);

      this.elements.blur();
      this.elements.element = this.sliderCards[this.sliderCardIndex];
      this.elements.focus();

      this.getCardData();
    } else {
      this.openMenu();
    }
  }

  translateHorizontal(value) {
    this.elements.parent.querySelector(
      '.horizontal__slider-wrapper'
    ).style.transform = 'translateX(' + value + 'vw)';
  }

  lastCardPerRow() { }

  removeFocus() {
    this.elements.blur();
    this.elements.parent = null;
    this.elements.element = null;
  }

  //Home methods
  getCardData() {
    this.is_previewPlaying = false;
    this.player?.reset();

    let cardData = this.homeResponse[this.horizontalSlideIndex].category_cards[this.sliderCardIndex];

    if (cardData.id == 1) {
      this.videoData = this.spider_man;
    } else {
      this.videoData = this.lucifer;
    }

    this.changePreview(this.videoData.preview_url)
  }

  initPlayer() {
    this.player = videojs(
      this.videoJS.nativeElement, this.playerOptions
    );

    this.player.on('play', () => {
      this.is_previewPlaying = true;
    });

    this.player.on('ended', () => {
      this.is_previewPlaying = false;
    });
  }

  changePreview(url) {

    this.clearVideoPrevTimer()

    this.videoPrev = setTimeout(() => {
      this.player.src({
        src: url,
        type: "video/mp4"
      });
      this.player.play()
    }, 3000);
  }

  clearVideoPrevTimer() {
    if (this.videoPrev) {
      clearTimeout(this.videoPrev)
      this.videoPrev = null
    }
  }
}

export interface VideoResponse {
  id: number,
  type: string,
  background: string;
  logo: string;
  year: string;
  adult_rate: string;
  length: string;
  total_seasons: string;
  resolution: string;
  categories: Array<string>;
  flag: string;
  name: string;
  description: string;
  imdb_rate: Number;
  current_state: object;
  seasons?: Array<object>;
  preview_url: string;
}

