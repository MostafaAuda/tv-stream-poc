import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { VIEWS_IDS } from '@app/services/navigation/Ids.config';
import { NavigationService } from '@app/services/navigation/navigation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
  //#region Declarations
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
  //#endregion

  constructor(
    private router: Router,
    private _navigationS: NavigationService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.getNavState();
  }

  ngOnDestroy() {
    this.navigation.unsubscribe();
  }

  //Navigation Methods
  getNavState() {
    this.navigation = this._navigationS.navState.subscribe((data) => {
      data.id === VIEWS_IDS.LOGIN
      ? this.handleNavAction(data.action)
      : null;
    });
  }

  handleNavAction(action: String) {
    switch (action) {
      case this._navigationS.navActions.Enter:
        this.router.navigateByUrl(`profile-${VIEWS_IDS.PROFILE}`);
        break;

      default:
        break;
    }
  }
}
