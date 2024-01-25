import { VIEWS_IDS } from './core/services/navigation/Ids.config';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { LoginComponent } from './modules/login/login/login.component';
import { PostsListComponent } from './modules/posts/posts-list/posts-list.component';
import { ProfileComponent } from './modules/profile/profile/profile.component';
import { SearchComponent } from './modules/search/search/search.component';
import { SettingsComponent } from './modules/settings/settings/settings.component';
import { VideoPlayerComponent } from './modules/video-player/video-player.component';
import { VideoDescriptionComponent } from './modules/video-description/video-description/video-description.component';
import { MyListComponent } from './modules/my-list/my-list/my-list.component';
import { AddProfileComponent } from './modules/profile/add-profile/add-profile.component';

//TODO: Guards
const routes: Routes = [
  {
    path: 'home',
    component: DashboardComponent,
    children: [
      {
        path: `testList-${VIEWS_IDS.HOME}`,
        component: PostsListComponent,
      },
      {
        path: `search-${VIEWS_IDS.SEARCH}`,
        component: SearchComponent,
      },
      {
        path: `settings-${VIEWS_IDS.SETTINGS}`,
        component: SettingsComponent,
      },
      {
        path: `my-list-${VIEWS_IDS.MY_LIST}`,
        component: MyListComponent,
      },
      {
        path: '',
        redirectTo: `testList-${VIEWS_IDS.HOME}`,
        pathMatch: 'full',
      },
    ],
  },
  {
    path: `video-${VIEWS_IDS.VIDEO_MOVIE}/:id/:type`,
    component: VideoPlayerComponent,
  },
  {
    path: `video-desc-${VIEWS_IDS.VIDEO_DESC}/:id/:type`,
    component: VideoDescriptionComponent,
  },
  {
    path: `login-${VIEWS_IDS.LOGIN}`,
    component: LoginComponent,
  },
  {
    path: `profile-${VIEWS_IDS.PROFILE}`,
    component: ProfileComponent,
  },
  {
    path: `add-profile-${VIEWS_IDS.ADD_PROFILE}`,
    component: AddProfileComponent,
  },
  {
    path: `edit-profile-${VIEWS_IDS.ADD_PROFILE}/:id`,
    component: AddProfileComponent,
  },
  {
    path: '',
    redirectTo: `login-${VIEWS_IDS.LOGIN}`,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
