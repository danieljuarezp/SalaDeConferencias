import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
declare let mdtoast: any;

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  urlService = 'http://localhost:59723/api/Customer';

  constructor() {}

  ngOnInit() {}

  onSubmit() {
    const url = `${this.urlService}/CreateCustomer`;

    const name = (<HTMLInputElement>document.getElementById('CustomerName')).value.trim();
    if (name.length === 0) {
      document.getElementById('InvalidName').classList.remove('hidden');
      return;
    }
    document.getElementById('InvalidName').classList.add('hidden');

    const regExpID = new RegExp('^[a-zA-Z0-9]{9,10}$');
    const ID = (<HTMLInputElement>document.getElementById('IdentificationNumber')).value.trim();
    if (!regExpID.test(ID)) {
      document.getElementById('InvalidID').classList.remove('hidden');
      return;
    }
    document.getElementById('InvalidID').classList.add('hidden');

    const regExpNumber = new RegExp('^[0-9]{11,}$');
    const phoneNumber = (<HTMLInputElement>document.getElementById('PhoneNumber')).value.trim();
    if (!regExpNumber.test(phoneNumber)) {
      document.getElementById('InvalidNumber').classList.remove('hidden');
      return;
    }
    document.getElementById('InvalidNumber').classList.add('hidden');

    const newCustomer = new Customer(name, ID, 0, Number(phoneNumber));

    fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCustomer)
      })
    .then(resul => resul.json())
    .then(customer =>{
      console.log(customer);
      (<HTMLInputElement>document.getElementById('CustomerName')).value = '';
      (<HTMLInputElement>document.getElementById('IdentificationNumber')).value = '';
      (<HTMLInputElement>document.getElementById('PhoneNumber')).value = '';
      mdtoast('Cliente creado con exito', { duration: 1000, type: mdtoast.SUCCESS });
    })
    .catch(console.error);
  }
}
