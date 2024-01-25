import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtitleModalComponent } from './subtitle-modal.component';

describe('SubtitleModalComponent', () => {
  let component: SubtitleModalComponent;
  let fixture: ComponentFixture<SubtitleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubtitleModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtitleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
