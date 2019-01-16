import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  urlService = 'http://localhost:59723/api/Customer';
  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      'CustomerName': new FormControl('', Validators.required),
      'CustomerIdentificationNumber': new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{9,10}$')]),
      'CustomerPhoneNumber': new FormControl('',  [Validators.required, Validators.pattern('^[0-9]{11,}$')])
    });
  }

  ngOnInit() {}

  SaveCustomer() {
    if (this.form.invalid) {
      Swal(
        'Error!',
        'Todos los campos son requeridos!',
        'error'
      );
      return;
    }

    const url = `${this.urlService}/CreateCustomer`;

    const newCustomer = new Customer(
      this.form.value['CustomerName'],
      this.form.value['CustomerIdentificationNumber'],
      0,
      Number(this.form.value['CustomerPhoneNumber']));

    fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCustomer)
      })
    .then(resul => resul.json())
    .then(customer => {
      Swal(
        'Creado!',
        'Cliente creado con exito!',
        'success'
      );
      this.form.reset();
    })
    .catch(console.error);
  }
}
