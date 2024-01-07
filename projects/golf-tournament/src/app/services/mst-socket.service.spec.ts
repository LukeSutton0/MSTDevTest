import { TestBed } from '@angular/core/testing';

import { MSTSocketService } from './mst-socket.service';

describe('MSTSocketService', () => {
  let service: MSTSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MSTSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
