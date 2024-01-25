import { TestBed } from '@angular/core/testing';

import { LoadingUIService } from './loading-ui.service';

describe('LoadingUIService', () => {
  let service: LoadingUIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingUIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
