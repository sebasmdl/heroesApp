import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.services';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
    '.stickyBar { position: fixed; }'
  ]
})
export class LayoutPageComponent implements OnInit {

  sidebarItems = [
    { label: 'Listado', icon: 'label', url:'./list'},
    { label: 'Añadir', icon: 'add', url:'./new-hero'},
    { label: 'Buscar', icon: 'search', url:'./search'},
  ]
  constructor(private authService:AuthService, private router: Router) { }
  ngOnInit(): void {
  }
  get user():User | undefined {
    return this.authService.currentUser;
  }
  onLogout(){
    this.authService.logout();
    this.router.navigate(['/auth/login'])
  }

}
