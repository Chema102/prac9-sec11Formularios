import { trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from 'src/app/servises/validadores.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  forma: FormGroup

  constructor(private fb:  FormBuilder,
              private validator: ValidadoresService) {
    this.crearFormulario();
    this.cargarDatosForm();
    this.crearListeners();
   }

  ngOnInit(): void {
  }

  noValido(nombre:string){
    if(this.forma.get(nombre).invalid && this.forma.get(nombre).touched){
      return true;
    }
    return false;
  }

  noValidoDoble( direccion:string, name:string){
    if(this.forma.get(direccion+'.'+name).invalid && this.forma.get(direccion+'.'+name).touched){
      return true;
    }
    return false;
  }

  get pasatiempos(){
    return this.forma.controls['pasatiempos'] as FormArray;

  }

  agrgarPasatiempo(){
    this.pasatiempos.push( this.fb.control('') )

  }
  borrarPasatiempo(i: number){
    this.pasatiempos.removeAt(i)
  }

  get pass2Vali(){
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;

    return (pass1 === pass2) ? false : true;
  }



  // get nombreNoValido(){
  //   return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  // }
  // get apellidoNoValido(){
  //   return this.forma.get('apellido').invalid && this.forma.get('apellido').touched
  // }
  // get correoNoValido(){
  //   return this.forma.get('correo').invalid && this.forma.get('correo').touched
  // }


  guardar(){
    // console.log(this.forma);
    console.log(this.forma);
    if (this.forma.invalid){
      Object.values(this.forma.controls).forEach( data =>{


        if( data instanceof FormGroup){
          Object.values(data.controls).forEach(data2 => data2.markAsTouched())

        }else{
          data.markAsTouched();

        }
      });

    }
  //guardamos en la base de datos con un servicio
          this.forma.reset();
  }

  cargarDatosForm(){
    this.forma.setValue({
      nombre: 'pipo',
      apellido: 'pipopipe',
      correo: 'jose_102102@hotmail.com',
      usuario: '',
      pass1: '123',
      pass2: '123',
      direccion:{
        distrito: 'ditritopaSi',
        ciudad:   'tijuana'
      },
      pasatiempos: []
    })
  }

  crearFormulario(){
    this.forma = this.fb.group({
      nombre:   ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required , this.validator.noPipo]],
      correo:   ['', [Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      usuario:  ['', , this.validator.exiteUser ],
      pass1:    ['', [Validators.required, ]],
      pass2:    ['', [Validators.required, ]],
      direccion:  this.fb.group({
        distrito: ['', Validators.required],
        ciudad:   ['', Validators.required]
      }),
      pasatiempos: this.fb.array([])
    },{
      //validacion personalizada
      validators: this.validator.passwordRepead('pass1','pass2')
    });
  }
  crearListeners(){
    //formulario completo
    // this.forma.valueChanges.subscribe( data =>{
    //   console.log(data);
    // })
    //estdo del formularui
    // this.forma.statusChanges.subscribe(data =>{
    //   console.log(data);
    // })
    //un solo formulario
    this.forma.get('apellido').valueChanges.subscribe(console.log)
  }
}
