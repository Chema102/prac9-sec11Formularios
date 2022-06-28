import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface validateError{
  [s:string]: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  noPipo( Control: FormControl): validateError{

    if (Control.value?.toLowerCase() === 'pipopi') {
      return{
        noPipopi: true
      }

    }

    return null;
  }

  passwordRepead(pass1:string,pass2:string){
    return (form : FormGroup) =>{
      const pass1control = form.controls[pass1];
      const pass2control = form.controls[pass2];
      if (pass1control.value === pass2control.value) {
        pass2control.setErrors(null);

      }else{
        pass2control.setErrors({ noEsIgual: true });
      }
    }

  }
  exiteUser( Control: FormControl): Promise<validateError> | Observable<validateError>{
    if (!Control.value) {
      return Promise.resolve(null)
    }
    return new Promise( (resolve, reject) => {
      setTimeout(() => {
        if (Control.value === 'pipo' ){
          resolve({ existe:true })
        }else{
          resolve(null)
        }
      }, 3500);

    } )

  }
}
