import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, pipe } from 'rxjs';
import { Paises } from '../models/paises.model';


@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  constructor(private http: HttpClient) { }

  getpaises(){
    return this.http.get('https://restcountries.com/v3.1/lang/spa').pipe(map( (data:any[]) =>{
      return data.map((data:Paises[]) =>({ nombre: data['name'].common, codigo: data['cca3']}));
    }));
  }
}
