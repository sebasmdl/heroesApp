import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { MatSnackBar } from '@angular/material/snack-bar'

import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit {
  public heroForm = new FormGroup({
    id: new FormControl(''),         
    superhero: new FormControl('', {nonNullable: true}),   
    publishers: new FormControl<Publisher>(Publisher.DCComics),   
    alter_ego: new FormControl(''),   
    first_appearance: new FormControl(''),   
    characters: new FormControl(''),   
    alt_img: new FormControl(''),   
  });
  public publishers = [
    { id:'DC Comics', desc: 'DC - Comics'},
    { id:'Marvel Comics', desc: 'Marvel - Comics'},
    
  ]
  constructor(
    private heroService:HeroesService,
    private routerActived: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) { }
  get currentHero():Hero{ 
    const hero = this.heroForm.value as Hero;
    return hero
  }
  ngOnInit(): void {
    if(!this.router.url.includes('edit')) return;
    this.routerActived.params.pipe(

      switchMap(({id}) => this.heroService.getHeroeById(id)), 

    ).subscribe( hero => {
      if(!hero) {
        return this.router.navigateByUrl('/');
      }
        this.heroForm.reset(hero);
        return;
    })
  }

  onSubmit(){
    if(!this.heroForm.valid) return
    if(this.currentHero.id){
      this.heroService.updateHero(this.currentHero )
      .subscribe( hero => {
        this.showSnackBar('Super heroe updated')
        this.router.navigate(['heroes/edit', hero.id])
      });
    }
    this.heroService.addHero(this.currentHero)
    .subscribe( hero => {
      this.router.navigate(['/heroes/edit', hero.id ]);
      this.showSnackBar(`${ hero.superhero } created!`);
    })
  }
  onDelete( ){
    if(!this.currentHero.id) throw Error('Hero id is required');
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value
    }); 
    dialog.afterClosed().pipe(
      filter((result:boolean) => result),
      switchMap(() => this.heroService.deleteHeroById(this.currentHero.id)),
      filter( (wasDeleted:boolean) => wasDeleted)
    ).subscribe( ()=> this.router.navigate(['/heroes']))
  }
  showSnackBar(message:string){
    this.snackbar.open(message, 'done', {
        duration: 2500,
    })
  } 
}
