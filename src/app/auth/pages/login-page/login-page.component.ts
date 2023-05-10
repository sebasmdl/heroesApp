import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  login(){
    this.authService.login('sebas@gmail.com','12345').
    subscribe( user => {
      this.router.navigate(['/'])
    });
  }

}
