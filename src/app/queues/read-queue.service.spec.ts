import { TestBed } from '@angular/core/testing';

import { ReadQueueService } from './read-queue.service';

describe('ReadQueueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReadQueueService = TestBed.get(ReadQueueService);
    expect(service).toBeTruthy();
  });
});
