import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class HeroesService {
    private baseUrl: string = environment.baseUrl;
    constructor(private http: HttpClient) { }
    
    getHeroes():Observable<Hero[]>{
        return this.http.get<Hero[]>(`${this.baseUrl}/heroes`)
    }

    getHeroeById(id: string):Observable<Hero|undefined>{
        return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`).
            pipe(
                catchError( error => of(undefined))
            )   
    }
    getSuggestions(query:string):Observable<Hero[]>{
        return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`);
    }
    addHero(hero:Hero):Observable<Hero> {
        return this.http.post<Hero>(`${this.baseUrl}/heroes`, hero);
    }
    updateHero(hero:Hero):Observable<Hero> {
        if(!hero) throw Error('Hero id is required');
        return this.http.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
    }
    deleteHeroById(id: string ):Observable<boolean> {
        if(!id) throw Error('Hero id is required');
        return this.http.delete<Hero>(`${this.baseUrl}/heroes/${id}`)
        .pipe(
            map( resp => true),
            catchError(err => of(false)),
        );
    }
}