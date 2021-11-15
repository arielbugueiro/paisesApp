import { Component, Input,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { switchMap, tap } from 'rxjs/operators';
import { Country } from '../../interfaces/pais-interface';

import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  @Input() paises: Country[] =[]; 
  
  translations!: string[];

  constructor( 
    private activateRoute: ActivatedRoute,
    private paisService: PaisService
    ) { }

  ngOnInit(): void {
   
   this.activateRoute.params
    .pipe(
      switchMap( (param) => this.paisService.getPaisPorAlpha( param.id ) ), 
      tap(console.log)         // el tap es un operador que dispara un efecto secundario

    )
    .subscribe( pais => {
        this.paises = pais;
      } ) 
   
   
  
  }

}
