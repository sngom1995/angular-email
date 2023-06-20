import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {

  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() control: FormControl = new FormControl();

  constructor() { }
  showErrors(){
    const { dirty, touched, errors } = this.control;
    return dirty && touched && errors;
  }
}
