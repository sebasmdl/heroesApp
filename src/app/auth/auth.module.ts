import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { MaterialModule } from '../material/material.module';
const components = [
  LayoutPageComponent,
  LoginPageComponent,
  RegisterPageComponent
]


@NgModule({
  declarations:components,
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule
  ],
  exports: components
})
export class AuthModule { }
