import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HeroeModel } from '../models/heroe.model';

@Injectable({
  providedIn: 'root'
})
export class HeroesService
{
  private url = 'https://login-app-b898c.firebaseio.com';

  constructor( private http: HttpClient ) {}

  crearHeroe( heroe: HeroeModel ) {
    return this.http.post( `${ this.url }/heroes.json`, heroe )
      .pipe(
        map( ( resp: any ) => {
          heroe.id = resp.name;
          return heroe;
        } )
      );
  }

  actualizarHeroe( heroe: HeroeModel ) {
    const heroeTemp = {
      ...heroe
    };
    delete heroeTemp.id;
    return this.http.put( `${ this.url }/heroes/${ heroe.id }.json`, heroeTemp );
  }

  getHeroe( id: string ) {
    return this.http.get( `${ this.url }/heroes/${ id }.json` );
  }

  getHeroes() {
    return this.http.get( `${ this.url }/heroes.json` )
      .pipe(
        map( resp => this.crearArreglo( resp ) )
      );
  }

  private crearArreglo( heroesObj: object ) {
    const heroes: HeroeModel[] = [];
    if( heroesObj === null ) {
      return [];
    }
    Object.keys( heroesObj ).forEach( key => {
      const heroe: HeroeModel = heroesObj[ key ];
      heroe.id = key;
      heroes.push( heroe );
    } );
    return heroes;
  }

  borrarHeroe( id: string ) {
    return this.http.delete( `${ this.url }/heroes/${ id }.json` )
  }
}
