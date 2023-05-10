import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404Component } from './error404/error404.component';

const components = [
  Error404Component
]

@NgModule({
  declarations: components,
  imports: [
    CommonModule
  ],
  exports: components
})
export class SharedModule { }
