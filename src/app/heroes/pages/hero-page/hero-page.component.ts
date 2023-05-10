import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs/operators';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [
    '.heroImage { width: 50%;  border-radius: 20px;}',
    '.containerHeroImage { text-align : -webkit-center}',
    '.center-loading { display: flex; justify-content: center; align-items: center;height: calc(100vh);}',
  ]
})
export class HeroPageComponent implements OnInit {
  public hero?: Hero;
  constructor( private heroesService: HeroesService,
               private activatedRoute: ActivatedRoute,
               private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        delay(2000), 
        switchMap( ({id}) => this.heroesService.getHeroeById(id))
      )
      .subscribe(hero => {
        console.log(hero)
        if(!hero) return this.router.navigate(['/heroes/list'])
        this.hero = hero
        return;
      })
  }
  goBack(){
    this.router.navigateByUrl('/heroes/list')
  }

}
