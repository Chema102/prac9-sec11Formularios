import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Paises } from 'src/app/models/paises.model';
import { PaisesService } from 'src/app/servises/paises.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  pais: Paises[] = [];
  persona={
    nombre: '',
    apellido: '',
    correo: '',
    pais: ''
  }

  constructor(private paises: PaisesService) { }

  ngOnInit(): void {
    this.paises.getpaises().subscribe(data => {
      this.pais = data

      this.pais.unshift({
        nombre: '[seleccione un pais]',
        codigo: ''
      })

      // console.log(this.pais);
    })


  }

  guardar( form : NgForm){
    if (form.invalid){
      Object.values(form.controls).forEach( data =>{
        data.markAsTouched();

      });

    }
    console.log(form.value);


  }
}
