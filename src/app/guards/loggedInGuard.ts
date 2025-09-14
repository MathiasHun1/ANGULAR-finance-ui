import { inject } from "@angular/core";
import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { AuthService } from "../services/auth-service";

export const loggedInGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return !authService.isLoggedin() || router.parseUrl("/");
};
