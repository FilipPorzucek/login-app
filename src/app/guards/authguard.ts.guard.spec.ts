import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authguardTsGuard } from './authguard.ts.guard';

describe('authguardTsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authguardTsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
