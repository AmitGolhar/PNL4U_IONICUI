import { CanActivateFn } from '@angular/router';

export const influencerGuard: CanActivateFn = (route, state) => {
  return true;
};
