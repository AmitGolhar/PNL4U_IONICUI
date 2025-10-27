import { CanActivateFn } from '@angular/router';

export const promoterGuard: CanActivateFn = (route, state) => {
  return true;
};
