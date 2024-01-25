import { Location } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VIEWS_IDS } from '@app/services/navigation/Ids.config';
import { NavigationService } from '@app/services/navigation/navigation.service';
import { Subscription } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-video-description',
  templateUrl: './video-description.component.html',
  styleUrls: ['./video-description.component.scss'],
})
export class VideoDescriptionComponent implements OnInit, AfterViewInit, OnDestroy {
  //#region Declarations
  @ViewChild('actionsParent') actionsParent: ElementRef;
  @ViewChildren('verticalSlider') verticals?: QueryList<ElementRef>;

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

  videoData: VideoResponse;

  spider_man: VideoResponse = {
    id: 1,
    type: 'movie',
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

    seasons: [
      {
        season_number: 1,
        total_episodes: 10,
        season_episodes: [
          {
            image:
              'https://occ-0-2774-2773.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABeXEdncm1B8IwkMDU_2tycS8GG3QoVHEelXe1-Q02nxe3z9uEwABf8a85Pv837pvfV86jEPMZK1okytRBN0M7JE65wjDPNNDLDrXYb0XBZqeUIQC.jpg?r=72a',
            title: 'Nothing Ever Changes Around Here',
            description:
              'Before Lucifer starts his new job, he and Chloe experience a magical night with a murderous end. Linda and Amenadiel host Maze and Eve for dinner.',
            length: 48,
            current_time: 22,
            time_left: '22:17',
            episode_number: 1,
          },
          {
            image:
              'https://occ-0-2774-2773.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABYt7RPGaMDD1aJ5d6bKvJBVml0PjDBesHUDS4g6R_p1Bi7QBxQHGPBFTYKVIAWTFze8UMuIPkbUUKxeBWvg4el7phRzhTbqIde1Sg5IXfywqMDoF.jpg?r=aaa',
            title: 'Buckets of Baggage',
            description:
              'Desperate to be helpful, Lucifer assists an exasperated Carol investigate a drag queens death. Ella and Chloe look into Carols mysterious background',
            length: 55,
            current_time: 10,
            time_left: '10:42',
            episode_number: 2,
          },
          {
            image:
              'https://occ-0-2774-2773.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABWhuOnRznfHz7W3UAySk8_z_59ShMNzLMkJd661Wi88i8b3rEYiz5SVWa4LmMTO-DkZ2GOm2a82NNabVSe5srTB4-t76whn1B425EIa7DpnH_0Rr.jpg?r=f44',
            title: 'Yabba Dabba Do Me',
            description:
              'Loony Lucifer and cartoon Chloe find themselves trapped in an animated loop. Amenadiel prepares for his new job. Dan returns to the city of angels.',
            length: 45,
            current_time: 30,
            time_left: '30:10',
            episode_number: 3,
          },
          {
            image:
              'https://occ-0-2774-2773.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABaaJ-knXYRaA9QiewYoVR8w_I_gjaovsTAAeVqxToyb1nUqMCl8z_tWRJjn9m_Y2QTifPCvVRGZQaSDq4LeR5paXHG-e8gopAUvtOm7mX43-JBDk.jpg?r=b18',
            title: 'Pin the Tail on the Daddy',
            description:
              'Lucifer reconnects with a few former flames in hopes of disproving Rorys claim. Dan tries to find someone — anyone — who can actually see him.',
            length: 44,
            current_time: 34,
            time_left: '34:50',
            episode_number: 4,
          },
          {
            image:
              'https://occ-0-2774-2773.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABUZeefiLZV1qFoYO1b7_HHNGkDGMdFAMHT443Y6la1g1b_AebOqZ0KM1sQcEPHEW3YCX9cYSnax5oVT7-U2F6JDL9oWAm98TvmmC8lJPT_TS_1wh.jpg?r=2b1',
            title: 'The Murder of Lucifer Morningstar',
            description:
              'Not believing that he could have abandoned his future daughter, Lucifer sets out to prove an alternate theory: He must have been murdered.',
            length: 47,
            current_time: 38,
            time_left: '38:34',
            episode_number: 5,
          },
          {
            image:
              'https://occ-0-2774-2773.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABcQ7uinzi11qejNjcVmcrLBv0HpjfqAzX4kFZzDKnHYXCZrTzQEZ_hb3McASgJlyDJ5yqSHkTXSPjHW8axBvsj2055-DH1Ec1E2TP7ezEbuZs5su.jpg?r=086',
            title: 'A Lot Dirtier Than That',
            description:
              'Wanting to do well on his first day with the LAPD, Amenadiel crosses paths with a racist detective from his past. Also, Lucifer tries to bond with Rory.',
            length: 42,
            current_time: 10,
            time_left: '10:22',
            episode_number: 6,
          },
          {
            image:
              'https://occ-0-2774-2773.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABaS19a80DR69-qLkyeMnae3WXrD7LQtorQlNgmqw4VEUZzGHvCR3TnhvqlPkCm3ibEW49JDXn7V-Cbuig6jQNQio-opW7i8zUxAq15MUFkPt5ARS.jpg?r=360',
            title: 'My Best Fiends Wedding',
            description:
              'Just as Eve and Mazes wedding day arrives, Eves ex, Adam — yes, that Adam — shows up hoping to reconcile. Later, Ella delivers some distressing news.',
            length: 50,
            current_time: 19,
            time_left: '19:23',
            episode_number: 7,
          },
          {
            image:
              'https://occ-0-2774-2773.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABX_bP_esycn30IAr4bmJDXbMDtsJROgE4bN2bTU1qsob2wiL3GV-Gu_8ZRHigr4lAXfpVz-JhUiRtAqlZVxcDB2U6O5P64zNBeA1Ul7CjeeTmgE3.jpg?r=1c5',
            title: 'Save the Devil, Save the World',
            description:
              'Lucifer says hes finally ready to be God, but his non-functioning wings would tend to disagree. Linda reluctantly shares the first draft of her book.',
            length: 43,
            current_time: 20,
            time_left: '20:53',
            episode_number: 8,
          },
          {
            image:
              'https://occ-0-2774-2773.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABfzG1pW9vllETw2kIRKYG2y0_DB97mQmueF04RBKe7ogf5FoZws6_zbRxz4QyQzv_tZ7CjorLEuL6hpxafxAb858UILFuh7ndDkP3jdFFjlKBcQz.jpg?r=42e',
            title: 'Goodbye, Lucifer',
            description:
              'Lucifer tries to enjoy what may be his last day on Earth, Dans killer escapes from prison, and Chloe drops a serious bombshell.',
            length: 44,
            current_time: 27,
            time_left: '27:47',
            episode_number: 9,
          },
          {
            image:
              'https://occ-0-2774-2773.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABXzzkzpalbo3D4y06LqlaV4a6c4FYrRd_BCSeonF6kLEVK_L_Qof9zPdpWqf41KevbX4nal8ioWTrwbqUFNaDw3suU9w0pyU3TTiqwe-Z1rPFbs3.jpg?r=23f',
            title: 'Partners Til the End',
            description:
              'Desperate to rescue Rory, Lucifer and Chloe confront her kidnapper with guns and wings blazing. Lucifer finally comes to terms with his purpose.',
            length: 49,
            current_time: 29,
            time_left: '29:39',
            episode_number: 10,
          },
        ],
      },
      {
        season_number: 2,
        total_episodes: 10,
        season_episodes: [
          {
            image:
              'https://occ-0-2774-2773.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABeXEdncm1B8IwkMDU_2tycS8GG3QoVHEelXe1-Q02nxe3z9uEwABf8a85Pv837pvfV86jEPMZK1okytRBN0M7JE65wjDPNNDLDrXYb0XBZqeUIQC.jpg?r=72a',
            title: 'Nothing Ever Changes Around Here',
            description:
              'Before Lucifer starts his new job, he and Chloe experience a magical night with a murderous end. Linda and Amenadiel host Maze and Eve for dinner.',
            length: 48,
            current_time: 22,
            episode_number: 1,
          },
          {
            image:
              'https://occ-0-2774-2773.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABYt7RPGaMDD1aJ5d6bKvJBVml0PjDBesHUDS4g6R_p1Bi7QBxQHGPBFTYKVIAWTFze8UMuIPkbUUKxeBWvg4el7phRzhTbqIde1Sg5IXfywqMDoF.jpg?r=aaa',
            title: 'Buckets of Baggage',
            description:
              'Desperate to be helpful, Lucifer assists an exasperated Carol investigate a drag queens death. Ella and Chloe look into Carols mysterious background',
            length: 55,
            current_time: 10,
            episode_number: 2,
          },
          {
            image:
              'https://occ-0-2774-2773.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABWhuOnRznfHz7W3UAySk8_z_59ShMNzLMkJd661Wi88i8b3rEYiz5SVWa4LmMTO-DkZ2GOm2a82NNabVSe5srTB4-t76whn1B425EIa7DpnH_0Rr.jpg?r=f44',
            title: 'Yabba Dabba Do Me',
            description:
              'Loony Lucifer and cartoon Chloe find themselves trapped in an animated loop. Amenadiel prepares for his new job. Dan returns to the city of angels.',
            length: 45,
            current_time: 30,
            episode_number: 3,
          },
          {
            image:
              'https://occ-0-2774-2773.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABaaJ-knXYRaA9QiewYoVR8w_I_gjaovsTAAeVqxToyb1nUqMCl8z_tWRJjn9m_Y2QTifPCvVRGZQaSDq4LeR5paXHG-e8gopAUvtOm7mX43-JBDk.jpg?r=b18',
            title: 'Pin the Tail on the Daddy',
            description:
              'Lucifer reconnects with a few former flames in hopes of disproving Rorys claim. Dan tries to find someone — anyone — who can actually see him.',
            length: 44,
            current_time: 34,
            episode_number: 4,
          },
          {
            image:
              'https://occ-0-2774-2773.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABUZeefiLZV1qFoYO1b7_HHNGkDGMdFAMHT443Y6la1g1b_AebOqZ0KM1sQcEPHEW3YCX9cYSnax5oVT7-U2F6JDL9oWAm98TvmmC8lJPT_TS_1wh.jpg?r=2b1',
            title: 'The Murder of Lucifer Morningstar',
            description:
              'Not believing that he could have abandoned his future daughter, Lucifer sets out to prove an alternate theory: He must have been murdered.',
            length: 47,
            current_time: 38,
            episode_number: 5,
          },
          {
            image:
              'https://occ-0-2774-2773.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABcQ7uinzi11qejNjcVmcrLBv0HpjfqAzX4kFZzDKnHYXCZrTzQEZ_hb3McASgJlyDJ5yqSHkTXSPjHW8axBvsj2055-DH1Ec1E2TP7ezEbuZs5su.jpg?r=086',
            title: 'A Lot Dirtier Than That',
            description:
              'Wanting to do well on his first day with the LAPD, Amenadiel crosses paths with a racist detective from his past. Also, Lucifer tries to bond with Rory.',
            length: 42,
            current_time: 10,
            episode_number: 6,
          },
          {
            image:
              'https://occ-0-2774-2773.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABaS19a80DR69-qLkyeMnae3WXrD7LQtorQlNgmqw4VEUZzGHvCR3TnhvqlPkCm3ibEW49JDXn7V-Cbuig6jQNQio-opW7i8zUxAq15MUFkPt5ARS.jpg?r=360',
            title: 'My Best Fiends Wedding',
            description:
              'Just as Eve and Mazes wedding day arrives, Eves ex, Adam — yes, that Adam — shows up hoping to reconcile. Later, Ella delivers some distressing news.',
            length: 50,
            current_time: 19,
            episode_number: 7,
          },
          {
            image:
              'https://occ-0-2774-2773.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABX_bP_esycn30IAr4bmJDXbMDtsJROgE4bN2bTU1qsob2wiL3GV-Gu_8ZRHigr4lAXfpVz-JhUiRtAqlZVxcDB2U6O5P64zNBeA1Ul7CjeeTmgE3.jpg?r=1c5',
            title: 'Save the Devil, Save the World',
            description:
              'Lucifer says hes finally ready to be God, but his non-functioning wings would tend to disagree. Linda reluctantly shares the first draft of her book.',
            length: 43,
            current_time: 20,
            episode_number: 8,
          },
          {
            image:
              'https://occ-0-2774-2773.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABfzG1pW9vllETw2kIRKYG2y0_DB97mQmueF04RBKe7ogf5FoZws6_zbRxz4QyQzv_tZ7CjorLEuL6hpxafxAb858UILFuh7ndDkP3jdFFjlKBcQz.jpg?r=42e',
            title: 'Goodbye, Lucifer',
            description:
              'Lucifer tries to enjoy what may be his last day on Earth, Dans killer escapes from prison, and Chloe drops a serious bombshell.',
            length: 44,
            current_time: 27,
            episode_number: 9,
          },
          {
            image:
              'https://occ-0-2774-2773.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABXzzkzpalbo3D4y06LqlaV4a6c4FYrRd_BCSeonF6kLEVK_L_Qof9zPdpWqf41KevbX4nal8ioWTrwbqUFNaDw3suU9w0pyU3TTiqwe-Z1rPFbs3.jpg?r=23f',
            title: 'Partners Til the End',
            description:
              'Desperate to rescue Rory, Lucifer and Chloe confront her kidnapper with guns and wings blazing. Lucifer finally comes to terms with his purpose.',
            length: 49,
            current_time: 29,
            episode_number: 10,
          },
        ],
      },
      {
        season_number: 3,
        total_episodes: 10,
        season_episodes: [
          {
            image:
              'https://occ-0-2774-2773.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABeXEdncm1B8IwkMDU_2tycS8GG3QoVHEelXe1-Q02nxe3z9uEwABf8a85Pv837pvfV86jEPMZK1okytRBN0M7JE65wjDPNNDLDrXYb0XBZqeUIQC.jpg?r=72a',
            title: 'Nothing Ever Changes Around Here',
            description:
              'Before Lucifer starts his new job, he and Chloe experience a magical night with a murderous end. Linda and Amenadiel host Maze and Eve for dinner.',
            length: 48,
            current_time: 22,
            episode_number: 1,
          },
          {
            image:
              'https://occ-0-2774-2773.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABYt7RPGaMDD1aJ5d6bKvJBVml0PjDBesHUDS4g6R_p1Bi7QBxQHGPBFTYKVIAWTFze8UMuIPkbUUKxeBWvg4el7phRzhTbqIde1Sg5IXfywqMDoF.jpg?r=aaa',
            title: 'Buckets of Baggage',
            description:
              'Desperate to be helpful, Lucifer assists an exasperated Carol investigate a drag queens death. Ella and Chloe look into Carols mysterious background',
            length: 55,
            current_time: 10,
            episode_number: 2,
          },
          {
            image:
              'https://occ-0-2774-2773.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABWhuOnRznfHz7W3UAySk8_z_59ShMNzLMkJd661Wi88i8b3rEYiz5SVWa4LmMTO-DkZ2GOm2a82NNabVSe5srTB4-t76whn1B425EIa7DpnH_0Rr.jpg?r=f44',
            title: 'Yabba Dabba Do Me',
            description:
              'Loony Lucifer and cartoon Chloe find themselves trapped in an animated loop. Amenadiel prepares for his new job. Dan returns to the city of angels.',
            length: 45,
            current_time: 30,
            episode_number: 3,
          },
          {
            image:
              'https://occ-0-2774-2773.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABaaJ-knXYRaA9QiewYoVR8w_I_gjaovsTAAeVqxToyb1nUqMCl8z_tWRJjn9m_Y2QTifPCvVRGZQaSDq4LeR5paXHG-e8gopAUvtOm7mX43-JBDk.jpg?r=b18',
            title: 'Pin the Tail on the Daddy',
            description:
              'Lucifer reconnects with a few former flames in hopes of disproving Rorys claim. Dan tries to find someone — anyone — who can actually see him.',
            length: 44,
            current_time: 34,
            episode_number: 4,
          },
          {
            image:
              'https://occ-0-2774-2773.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABUZeefiLZV1qFoYO1b7_HHNGkDGMdFAMHT443Y6la1g1b_AebOqZ0KM1sQcEPHEW3YCX9cYSnax5oVT7-U2F6JDL9oWAm98TvmmC8lJPT_TS_1wh.jpg?r=2b1',
            title: 'The Murder of Lucifer Morningstar',
            description:
              'Not believing that he could have abandoned his future daughter, Lucifer sets out to prove an alternate theory: He must have been murdered.',
            length: 47,
            current_time: 38,
            episode_number: 5,
          },
          {
            image:
              'https://occ-0-2774-2773.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABcQ7uinzi11qejNjcVmcrLBv0HpjfqAzX4kFZzDKnHYXCZrTzQEZ_hb3McASgJlyDJ5yqSHkTXSPjHW8axBvsj2055-DH1Ec1E2TP7ezEbuZs5su.jpg?r=086',
            title: 'A Lot Dirtier Than That',
            description:
              'Wanting to do well on his first day with the LAPD, Amenadiel crosses paths with a racist detective from his past. Also, Lucifer tries to bond with Rory.',
            length: 42,
            current_time: 10,
            episode_number: 6,
          },
          {
            image:
              'https://occ-0-2774-2773.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABaS19a80DR69-qLkyeMnae3WXrD7LQtorQlNgmqw4VEUZzGHvCR3TnhvqlPkCm3ibEW49JDXn7V-Cbuig6jQNQio-opW7i8zUxAq15MUFkPt5ARS.jpg?r=360',
            title: 'My Best Fiends Wedding',
            description:
              'Just as Eve and Mazes wedding day arrives, Eves ex, Adam — yes, that Adam — shows up hoping to reconcile. Later, Ella delivers some distressing news.',
            length: 50,
            current_time: 19,
            episode_number: 7,
          },
          {
            image:
              'https://occ-0-2774-2773.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABX_bP_esycn30IAr4bmJDXbMDtsJROgE4bN2bTU1qsob2wiL3GV-Gu_8ZRHigr4lAXfpVz-JhUiRtAqlZVxcDB2U6O5P64zNBeA1Ul7CjeeTmgE3.jpg?r=1c5',
            title: 'Save the Devil, Save the World',
            description:
              'Lucifer says hes finally ready to be God, but his non-functioning wings would tend to disagree. Linda reluctantly shares the first draft of her book.',
            length: 43,
            current_time: 20,
            episode_number: 8,
          },
          {
            image:
              'https://occ-0-2774-2773.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABfzG1pW9vllETw2kIRKYG2y0_DB97mQmueF04RBKe7ogf5FoZws6_zbRxz4QyQzv_tZ7CjorLEuL6hpxafxAb858UILFuh7ndDkP3jdFFjlKBcQz.jpg?r=42e',
            title: 'Goodbye, Lucifer',
            description:
              'Lucifer tries to enjoy what may be his last day on Earth, Dans killer escapes from prison, and Chloe drops a serious bombshell.',
            length: 44,
            current_time: 27,
            episode_number: 9,
          },
          {
            image:
              'https://occ-0-2774-2773.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABXzzkzpalbo3D4y06LqlaV4a6c4FYrRd_BCSeonF6kLEVK_L_Qof9zPdpWqf41KevbX4nal8ioWTrwbqUFNaDw3suU9w0pyU3TTiqwe-Z1rPFbs3.jpg?r=23f',
            title: 'Partners Til the End',
            description:
              'Desperate to rescue Rory, Lucifer and Chloe confront her kidnapper with guns and wings blazing. Lucifer finally comes to terms with his purpose.',
            length: 49,
            current_time: 29,
            episode_number: 10,
          },
        ],
      },
    ],
  };

  videoID: number;
  videoType: string;

  is_episodesShowen: boolean = false;

  //Horizontal Sliders Properties
  verticalSliders;
  totalVerticalSliders;
  verticalSlideIndex: number = 0;
  horizontalTranslate: number = 0;

  //Vertical Sliders Properties
  sliderCards;
  totalSliderCards;
  sliderCardIndex: number;
  verticalTranslate: number;

  translateValue: number;
  is_inList: boolean = false;
  //#endregion

  constructor(
    private _navigationS: NavigationService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private localStorage: LocalStorageService
  ) {
    this.route.params.subscribe((param: any) => {
      this.videoID = param.id;
      this.videoType = param.type;
    });
  }

  ngOnInit(): void {
    this.getDescription();
    this.getListStatus(this.videoID);
  }

  ngAfterViewInit(): void {    
    this.getNavState();
  }

  ngOnDestroy(): void {
    this.navigation.unsubscribe();
  }

  //Initiate horizontal navigation
  initVerticalNavigation() {
    this.initVerticalNavigationOnChange();
    this.verticals?.changes.subscribe((res) => {
      this.initVerticalNavigationOnChange(res);
    });
  }

  //Initiate cards navigation
  initCardNavigation() {
    this.sliderCards = this.elements.parent?.querySelectorAll('.slider-slide');
    this.setCardNavigation();
  }

  //Navigation Methods
  getNavState() {
    this.navigation = this._navigationS.navState.subscribe((data) => {
      this.translateValue = data.videoDescTranslateValue;
      data.id === VIEWS_IDS.VIDEO_DESC
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

  goBack() {
    this.location.back();
  }

  goToVideoPlayer (videoID?, videoType?) {
    this.router.navigateByUrl(`video-${VIEWS_IDS.VIDEO_MOVIE}/${videoID}/${videoType}`);
  }

  handleNavAction(action: String) {
    switch (action) {
      case this._navigationS.navActions.NavInit:
        this.goToActions();
        this.initVerticalNavigation();
        break;

      case this._navigationS.navActions.Enter:
        this.clickOnActiveCard();
        break;

      case this._navigationS.navActions.ArrowRight:
        if (this.is_episodesShowen) {
          if (this.parentIsActions()) {
            this.setVerticalNavigation();
          } else {
            this.nextVertical();
          }
        }
        break;

      case this._navigationS.navActions.ArrowLeft:
        if (this.parentIsFirstVerticalSlider()) {
          this.goToActions();
        } else {
          this.prevVertical();
        }
        break;

      case this._navigationS.navActions.ArrowUp:
        if (this.parentIsActions()) {
          this.prevChild();
        } else {
          this.prevCard();
        }
        break;

      case this._navigationS.navActions.ArrowDown:
        if (this.parentIsActions()) {
          this.nextChild();
        } else {
          this.nextCard();
        }
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

  //DOM manipulation action methods
  goToActions() {    
    this.elements.blur();
    this.elements.parent = this.actionsParent.nativeElement;
    this.elements.element = this.actionsParent.nativeElement.firstElementChild;
    this.elements.focus();
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

  //DOM Manipulation Vertical Methods
  initVerticalNavigationOnChange(res?) {
    if (res) {
      this.verticalSliders = res?.toArray();
      this.totalVerticalSliders = this.verticalSliders.length - 1;
    } else {
      this.verticalSliders = this.verticals?.toArray();
      this.totalVerticalSliders = this.verticalSliders.length - 1;
    }
  }

  setVerticalNavigation() {
    this.elements.parent = this.verticalSliders[this.verticalSlideIndex].nativeElement;
    this.sliderCardIndex = this.elements.parent.getAttribute('cardIndex');
    this.verticalTranslate = this.elements.parent.getAttribute('translate');
    this.verticalTranslate = Number(this.verticalTranslate);

    //Init Cards after vertical slider
    this.initCardNavigation();
  }

  parentIsFirstVerticalSlider() {
    if (this.elements.parent == this.verticalSliders[0]?.nativeElement) {
      return true;
    }
  }

  nextVertical() {
    if (this.verticalSlideIndex != this.totalVerticalSliders) {
      ++this.verticalSlideIndex;
      this.horizontalTranslate -= this.translateValue;
      this.setVerticalNavigation();
    }
  }

  prevVertical() {
    if (this.verticalSlideIndex != 0) {
      --this.verticalSlideIndex;
      this.horizontalTranslate += this.translateValue;
      this.setVerticalNavigation();
    }
  }

  //DOM Manipulation Cards Methods
  setCardNavigation() {
    this.totalSliderCards = this.sliderCards.length - 1;

    this.elements.blur();
    this.elements.element = this.sliderCards[this.sliderCardIndex];
    this.elements.focus();
  }

  nextCard() {    
    if (this.sliderCardIndex != this.totalSliderCards) {
      ++this.sliderCardIndex;
      this.verticalTranslate -= 22;
      this.verticalTranslate = Number(this.verticalTranslate.toFixed(2));

      this.elements.parent.setAttribute('cardIndex', this.sliderCardIndex);
      this.elements.parent.setAttribute('translate', this.verticalTranslate);

      this.translateHorizontal(this.verticalTranslate);

      this.elements.blur();
      this.elements.element = this.sliderCards[this.sliderCardIndex];
      this.elements.focus();
    }
  }

  prevCard() {
    if (this.sliderCardIndex != 0) {
      --this.sliderCardIndex;
      this.verticalTranslate += 22;
      this.verticalTranslate = Number(this.verticalTranslate.toFixed(2));

      this.elements.parent.setAttribute('cardIndex', this.sliderCardIndex);
      this.elements.parent.setAttribute('translate', this.verticalTranslate);

      this.translateHorizontal(this.verticalTranslate);

      this.elements.blur();
      this.elements.element = this.sliderCards[this.sliderCardIndex];
      this.elements.focus();
    }
  }

  translateHorizontal(value) {
    this.elements.parent.querySelector(
      '.veritcal__slider-wrapper'
    ).style.transform = 'translateY(' + value + 'vh)';
  }

  removeFocus() {
    this.elements.blur();
    this.elements.parent = null;
    this.elements.element = null;
  }

  //Video description methods
  toggleEpisodes() {
    this.is_episodesShowen = !this.is_episodesShowen;
  }

  getDescription() {
    if (this.videoID == 1) {
      this.videoData = this.spider_man;
    } else {
      this.videoData = this.lucifer;
    }
  }

  getListStatus(id) {
    if (this.localStorage.getFromListById(id)) {
      this.is_inList = true;    
    }
  }

  addToMyList(id) {
    if (this.is_inList) {
      this.localStorage.deleteFromListById(id);  
      this.is_inList = !this.is_inList;
    } else {
      this.localStorage.addToMyList(id);  
      this.is_inList = !this.is_inList;
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
}
