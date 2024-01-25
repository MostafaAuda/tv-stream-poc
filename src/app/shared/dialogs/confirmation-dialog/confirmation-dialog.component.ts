import { DialogData } from './../../../core/services/navigation/navigation.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { VIEWS_IDS } from '@app/services/navigation/Ids.config';
import { NavigationService } from '@app/services/navigation/navigation.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  //#region Declarations
  @ViewChild('actionsParent', { static: true }) actionsParent: ElementRef;

  private navigation!: Subscription;

  data: DialogData

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
    public ngxSmartModalService: NgxSmartModalService,
    private _navigationS: NavigationService,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.getNavState();
  }

  ngOnDestroy(): void {
    this.navigation.unsubscribe();
  }

  //Get modal data
  getModalData () {
    this.data = <DialogData>this.ngxSmartModalService.getModal('confirmation').getData()
  }

  //Navigation Methods
  getNavState() {
    this.navigation = this._navigationS.navState.subscribe((data) => {
      data.id === VIEWS_IDS.CONFIRMATION_MODAL
        ? this.handleNavAction(data.action)
        : null;
    });
  }

  clickOnActiveCard() {
    this.elements.element.dispatchEvent(new Event('click'));
  }

  closeModal() {
    this._navigationS.closeConfirmationModal(this.data.returnId)
  }
  onConfirm(){
    this.data.confirmFun()
    this.closeModal()
  }

  handleNavAction(action: String) {
    switch (action) {
      case this._navigationS.navActions.NavInit:
        this.getModalData();
        this.goToActions();
        break;

      case this._navigationS.navActions.Enter:
        this.clickOnActiveCard();
        break;

      case this._navigationS.navActions.ArrowRight:
        this.nextChild();
        break;

      case this._navigationS.navActions.ArrowLeft:
        this.prevChild();
        break;

      case this._navigationS.navActions.ArrowUp:
        break;

      case this._navigationS.navActions.ArrowDown:
        break;

      case this._navigationS.navActions.Back:
        this._navigationS.closeConfirmationModal(this.data.returnId)
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

}
