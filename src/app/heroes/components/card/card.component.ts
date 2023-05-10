import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './card.component.html',
  styles: [
    '.scrolling-wrapper .mat-listbox-container { display: inline-block}',
    '.scrolling-wrapper .mat-listbox-item { margin-left: 5px; font-size: 12px;margin-top: 5px;padding: 5px;border-radius: 13px;background-color: #c5c5c5; }',
    '.scrolling-wrapper { width: 200px; overflow-x: scroll; overflow-y: hidden; white-space: nowrap; -webkit-overflow-scrolling: touch; } ',
    '.scrolling-wrapper-thumb { background-color: #d6dee1; border-radius: 20px; border: 6px solid transparent; background-clip: content-box; } ',
    '.scrolling-wrapper .card { display: inline-block; }'
  ]
})
export class CardComponent implements OnInit {

  constructor() { }
  @Input() public hero!: Hero;
  ngOnInit(): void {
    if(!this.hero) throw Error('Hero property is required')
  }

}
