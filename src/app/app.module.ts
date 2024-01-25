import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import {
  APP_BASE_HREF,
  LocationStrategy,
  HashLocationStrategy,
} from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PostsListComponent } from './modules/posts/posts-list/posts-list.component';
import { VideoPlayerComponent } from './modules/video-player/video-player.component';
import { InterceptorService } from '@app/services/interceptor/interceptor.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { SearchComponent } from './modules/search/search/search.component';
import { LoginComponent } from './modules/login/login/login.component';
import { ProfileComponent } from './modules/profile/profile/profile.component';
import { SettingsComponent } from './modules/settings/settings/settings.component';
import { VideoDescriptionComponent } from './modules/video-description/video-description/video-description.component';
import { MyListComponent } from './modules/my-list/my-list/my-list.component';
import { SubtitleModalComponent } from './shared/modals/subtitle-modal/subtitle-modal.component';
import { AddProfileComponent } from './modules/profile/add-profile/add-profile.component';
import { ConfirmationDialogComponent } from './shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import { MoviesComponent } from './modules/home/movies/movies.component';
import { SeriesesComponent } from './modules/home/serieses/serieses.component';
import { ChangePictureModalComponent } from './shared/modals/change-picture-modal/change-picture-modal.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PostsListComponent,
    VideoPlayerComponent,
    SearchComponent,
    LoginComponent,
    ProfileComponent,
    SettingsComponent,
    VideoDescriptionComponent,
    MyListComponent,
    SubtitleModalComponent,
    AddProfileComponent,
    ConfirmationDialogComponent,
    MoviesComponent,
    SeriesesComponent,
    ChangePictureModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgxSmartModalModule.forRoot(),
    TranslateModule.forRoot(),
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
