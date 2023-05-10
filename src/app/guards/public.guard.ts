import { Injectable } from '@angular/core';
import { CanActivate, CanMatch, Route, UrlSegment, ActivatedRouteSnapshot,  RouterStateSnapshot, Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../auth/services/auth.services';

@Injectable({providedIn: 'root'})
export class PublicGuard implements CanMatch, CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }
    private checkAuthStatus():Observable<boolean> {
        return this.authService.checkAuthetincation()
        .pipe(
            tap( isAuthenticated => console.log('isAuthenticated =>', isAuthenticated)),
            tap( isAuthenticated => {
                if(isAuthenticated) this.router.navigate(['./'])
            }),
            map( isAuthenticated => !isAuthenticated)
        )
    }
    canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
         return this.checkAuthStatus();
    }
        
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
        return this.checkAuthStatus();
    }
}