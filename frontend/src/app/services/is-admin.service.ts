import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Route, Router, RouterLinkActive, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {TokenService} from './token.service';
import {JarwisService} from './jarwis.service';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsAdminService implements CanActivate {
  a: number;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.a === 2 ||  this.a === 3) {
      return true;
    }
    this.router.navigateByUrl('/');
    return false;

  }

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    this.auth.roleAdmin.subscribe(value => {
      this.a = value;
    });

  }
}
