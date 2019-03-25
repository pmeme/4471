import { TestBed } from '@angular/core/testing';

import { ViewBreachResolverService } from './view-breach-resolver.service';

describe('ViewBreachResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewBreachResolverService = TestBed.get(ViewBreachResolverService);
    expect(service).toBeTruthy();
  });
});
