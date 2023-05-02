
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    this.authService.getCurrentUser((result: any, firstTime: any) => {
      var permissions = JSON.parse(result.claims.tools);

      console.log("permissions", permissions);
      console.log("url", state.url);
      
      var canAccess = permissions.filter((item) => {

        if (item.Route + "/create" == state.url && item.CanWrite)
          return true;

        if (state.url.startsWith(item.Route + "/edit/") && item.CanWrite) {

          console.log("canActivate edit")
          return true;
        }

        if (state.url.startsWith(item.Route + "/details/") && state.url && item.CanReadOne)
          return true;
        
        if (state.url.startsWith(item.Route + "/page/") && state.url && item.CanReadOne)
          return true;


        if (state.url.startsWith(item.Route + "/print/") && state.url && item.CanReadOne)
          return true;


        return item.Route == state.url;

      }).length > 0;
      if (!canAccess) {
        return true;
      }
    });

      return true;
  }

}
