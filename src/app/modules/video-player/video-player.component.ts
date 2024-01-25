import { NAV_SETTINGS } from './../../core/services/navigation/nav.settings';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Location } from '@angular/common';
import videojs from 'video.js';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { NavigationService } from '@app/services/navigation/navigation.service';
import { Subscription } from 'rxjs';
import { MODALS_NAMES, VIEWS_IDS } from '@app/services/navigation/Ids.config';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnInit, AfterViewInit, OnDestroy {
  //#region Declarations
  @ViewChild('videoJS', { static: true }) videoJS: ElementRef;
  @ViewChild('actionsParent', { static: false }) actionsParent: ElementRef;
  @ViewChild('controlParent', { static: false }) controlParent: ElementRef;

  private navigation!: Subscription;

  player: videojs.Player;

  playerDurationTime;
  playerDuration;

  playerCurrentSecs = 0;
  playerCurrentTime = '00:00:00';

  seekBarValue = 0;
  stepSecs = 10;
  stepValue;

  state = STATE.PLAY;

  delay: boolean = false;

  videoID: number;
  videoType: string;

  playerOptions = {
    autoplay: true,
    controls: false,
    preload: 'auto',
    aspectRatio: '16:9',
  };

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

  videoDescription;

  lucifer = {
    id: 2,
    type: 'series',
    name: 'Lucifer',
    src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    current_state: {
      season: 1,
      episode: 4,
      title: 'Nothing Ever Changes Around Here',
      current_time: 34,
    },
  }

  spider_man = {
    id: 1,
    type: 'movie',
    name: 'Spider-Man: No Way Home',
    src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    current_state: {
      season: null,
      episode: null,
      title: '',
      current_time: 34,
    },
  }
  //#endregion

  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    private location: Location,
    private _navigationS: NavigationService,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe((param: any) => {
      this.videoID = param.id;
      this.videoType = param.type;
    })
  }

  ngOnInit(): void {
    this.getVideo();
    this.initPlayer();
    this.playerControlsInit();
  }

  ngAfterViewInit(): void {
    this.getNavState();
    this.changeSubtitle('en');
  }

  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
    this.navigation.unsubscribe();
  }

  initPlayer() {
    this.player = videojs(
      this.videoJS.nativeElement,
      this.playerOptions,
      function onPlayerReady() {
        console.log(this);
      }
    );
  }

  playerControlsInit() {
    this.player.on('pause', () => {
      this.state = STATE.PAUSE;

      this.getPlayerData();

      //On Pause
      this.openActions();
    });

    this.player.on('play', () => {
      this.state = STATE.PLAY;

      //Set current time based on actions
      this.player.currentTime(this.playerCurrentSecs);

      //On Play
      this.closeActions();
    });

    this.player.on('ended', () => {
      this.state = STATE.ENDED;

      //reset player or go to the next video in playlist or destroy video if it a movie
      this.resetSeekBar();

      //On End
      this.openActions();
    });
  }

  //Remote Controls listener
 
  //Navigation Methods
  getNavState() {
    this.navigation = this._navigationS.navState.subscribe((data) => {
      data.id === VIEWS_IDS.VIDEO_MOVIE
      ? this.handleNavAction(data.action)
      : null;
    });
  }

  closeVideo() {
    this.location.back();
  }

  //Modal Methods
  openActions() {
    this.ngxSmartModalService.getModal('videoActions').open();
    this.setControlKeys();
  }

  closeActions() {
    this.ngxSmartModalService.getModal('videoActions').close();
    this.removeFocus();
  }

  handleNavAction(action: String) {
    //delay can not be a stand alone function
    if (this.delay) {
      return;
    }

    this.delay = true;

    setTimeout(() => {
      this.delay = false;
    }, NAV_SETTINGS.VIDEO_DELAY_MS);

    switch (this.state) {
      case STATE.PLAY:
        this.handlePlayNavigation(action);
        break;

      case STATE.PAUSE:
        this.handlePauseNavigation(action);
        break;

      case STATE.ENDED:
        this.handlePauseNavigation(action);
        break;

      default:
        break;
    }
  }

  handlePauseNavigation(action) {
    switch (action) {
      case this._navigationS.navActions.NavInit:
        break;

      case this._navigationS.navActions.Enter:
        this.elements.element.dispatchEvent(new Event('click'));
        break;

      case this._navigationS.navActions.ArrowRight:
        if (this.parentIsActions()) {
          this.nextAction();
        }

        if (this.parentIsControls()) {
          this.seekForward();
        }
        break;

      case this._navigationS.navActions.ArrowLeft:
        if (this.parentIsActions()) {
          this.prevAction();
        }

        if (this.parentIsControls()) {
          this.seekBackward();
        }
        break;

      case this._navigationS.navActions.ArrowUp:
        if (this.parentIsControls()) {
          this.setActionsKeys();
        }
        break;

      case this._navigationS.navActions.ArrowDown:
        if (this.parentIsActions()) {
          this.setControlKeys();
        }
        break;

      case this._navigationS.navActions.Back:
        this.play();
        break;

      default:
        break;
    }
  }

  handlePlayNavigation(action) {
    switch (action) {
      case this._navigationS.navActions.NavInit:
        break;

      case this._navigationS.navActions.Enter:
        this.player.pause();
        break;

      case this._navigationS.navActions.ArrowRight:
        this.player.pause();
        break;

      case this._navigationS.navActions.ArrowLeft:
        this.player.pause();
        break;

      case this._navigationS.navActions.ArrowUp:
        this.player.pause();
        break;

      case this._navigationS.navActions.ArrowDown:
        this.player.pause();
        break;

      case this._navigationS.navActions.Back:
        this.closeVideo();
        break;

      default:
        break;
    }
  }

  //DOM Manipulation Methods
  setActionsKeys() {
    this.elements.blur();
    this.elements.parent = this.actionsParent.nativeElement;
    this.elements.element = this.actionsParent.nativeElement.firstElementChild;
    this.elements.focus();
  }

  setControlKeys() {
    this.elements.blur();
    this.elements.parent = this.controlParent.nativeElement;
    this.elements.element = this.controlParent.nativeElement.firstElementChild;
    this.elements.focus();
  }

  parentIsControls() {
    if (this.elements.parent == this.controlParent.nativeElement) {
      return true;
    }
  }

  parentIsActions() {
    if (this.elements.parent == this.actionsParent.nativeElement) {
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

  nextAction() {
    if (!this.isLastChild()) {
      this.elements.blur();
      this.elements.element = this.elements.element.nextElementSibling;
      this.elements.focus();
    }
  }

  prevAction() {
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
  }

  //Actions Methods
  play() {
    this.player.play();
  }

  showSubtitles() {
    this._navigationS.openModal(VIEWS_IDS.SUBTITLE_MODAL, MODALS_NAMES.SUBTITLE_MODAL)
  }

  replay() {
    this.resetSeekBar();
    this.play();
  }

  nextEpisode() {
    console.log('GO NEXT');
  }

  //Seekbar Methods
  getPlayerData() {
    //Get video current time and duration
    this.playerDuration = Math.round(this.player.duration());
    this.playerCurrentSecs = Math.round(this.player.currentTime());

    //Seekbar data
    this.playerDurationTime = this.convertSecondstoTime(this.playerDuration);
    this.playerCurrentTime = this.convertSecondstoTime(this.playerCurrentSecs);
    this.seekBarValue = this.calculateSeekBarValue(
      this.playerCurrentSecs,
      this.playerDuration
    );
    this.stepValue = this.calculateSeekBarStep();
  }

  seekForward() {
    //stop seek in the last 10 seconds
    var lastStep = this.playerDuration - this.stepSecs;
    if (this.playerCurrentSecs >= lastStep) {
      return;
    }

    this.playerCurrentSecs = this.playerCurrentSecs += this.stepSecs;
    this.playerCurrentTime = this.convertSecondstoTime(this.playerCurrentSecs);
    this.seekBarValue = this.seekBarValue + this.stepValue;
  }

  seekBackward() {
    if (this.playerCurrentSecs <= this.stepSecs) {
      this.resetSeekBar();
    } else {
      this.playerCurrentSecs = this.playerCurrentSecs -= this.stepSecs;
      this.playerCurrentTime = this.convertSecondstoTime(
        this.playerCurrentSecs
      );
      this.seekBarValue = this.seekBarValue - this.stepValue;
    }
  }

  resetSeekBar() {
    this.playerCurrentSecs = 0;
    this.playerCurrentTime = this.convertSecondstoTime(this.playerCurrentSecs);
    this.seekBarValue = 0;
  }

  //Helper methonds
  convertSecondstoTime(secs) {
    var dateObj = new Date(secs * 1000);
    var hours = dateObj.getUTCHours();
    var minutes = dateObj.getUTCMinutes();
    var seconds = dateObj.getSeconds();

    var timeString =
      hours.toString().padStart(2, '0') +
      ':' +
      minutes.toString().padStart(2, '0') +
      ':' +
      seconds.toString().padStart(2, '0');

    return timeString;
  }

  calculateSeekBarValue(secs, duration) {
    return Math.round((secs / duration) * 100);
  }

  calculateSeekBarStep() {
    return Math.round((this.stepSecs / this.playerDuration) * 100);
  }

  //Video Methods
  getVideo() {
    if (this.videoID == 1) {      
      this.videoDescription = this.spider_man;
    } else {
      this.videoDescription = this.lucifer;
    }        
  }

  changeSubtitle(language?) {    
    let tracks = this.player.textTracks();

    for (let i = 0; i < tracks.length; i++) {
      let track = tracks[i];

      track.mode = "disabled";

      if (track.language === language) {
        track.mode = 'showing';          
      }
    }

    this._navigationS.closeModal(MODALS_NAMES.SUBTITLE_MODAL);
    this.play();
  }

}

enum STATE {
  PLAY = 'PLAY',
  PAUSE = 'PAUSE',
  ENDED = 'ENDED',
}
