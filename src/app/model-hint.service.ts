import { Injectable } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ModelHintService {

  constructor() { }

  hint(control: AbstractControl): string {
    if (control.valid) {
      return '';
    }
    if (!control.dirty && !control.touched) {
      return '';
    }

    let err = control.errors;
    if (err != null) {
      switch (true) {
        case 'required' in err:
          return '必填';
        case 'maxlength' in err:
          return '最大长度: ' + err.maxlength.requiredLength.toString();
        case 'minlength' in err:
          return '最小长度: ' + err.minlength.requiredLength.toString();
        default:
          console.log('Unknown model validation error type in control', control);
          throw 'Unknown model validation error type in control';
      }
    } else {
      return null;
    }
  }
}
