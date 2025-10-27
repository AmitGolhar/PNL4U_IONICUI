import { CanActivateFn } from '@angular/router';

export const clubadminGuard: CanActivateFn = (route, state) => {
  return true;
};
