import { Injectable } from '@angular/core';
import { CanActivate, CanMatch, Route, UrlSegment, ActivatedRouteSnapshot,  RouterStateSnapshot, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth/services/auth.services';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanMatch, CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }
    private checkAuthStatus():Observable<boolean> {
        return this.authService.checkAuthetincation()
        .pipe(
            tap( isAuthenticated => console.log('isAuthenticated =>', isAuthenticated)),
            tap( isAuthenticated => {
                if(!isAuthenticated) this.router.navigate(['./auth/login'])
            }),
        )
    }
    canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
         console.log('Can Match');
         console.log({route, segments})
         return this.checkAuthStatus();
        }
        
        canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
            console.log('Can Activate');
            console.log({route, state})
            // console.log({ route, state })
            return this.checkAuthStatus();
      }
}