import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-customers',
  templateUrl: './get-customers.component.html',
  styleUrls: ['./get-customers.component.css']
})
export class GetCustomersComponent implements OnInit {

  urlService = 'http://localhost:59723/api/Customer';
  customers: Customer[] = [];
  loading = true;

  constructor() {
  }

  ngOnInit() {
   this.LoadCustomers();
  }

  LoadCustomers() {
    this.loading = true;
    const url = `${this.urlService}/GetAllCustomers`;
    fetch(url)
    .then(resul => resul.json())
    .then(customers =>  {
      this.customers = customers;
      this.loading = false;
    })
    .catch(console.error);
  }

  UpdateCustomer(customer: any) {
    Swal({
      title: 'Editar cliente!',
      html:
    `<br>
     <label>Nombre</label><input id="name" class="swal2-input" value="${customer.name}">
     <label>Número de Identificacion</label><input id="id" class="swal2-input"  value="${customer.identificationNumber}">
     <label>Número de telefono</label><input id="number" class="swal2-input"  value="${customer.phoneNumber}">`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar',
      preConfirm: () => {
        return [
          (<HTMLInputElement>document.getElementById('name')).value.trim(),
          (<HTMLInputElement>document.getElementById('id')).value.trim(),
          (<HTMLInputElement>document.getElementById('number')).value.trim()
        ];
      }
    }).then((result) => {
      if (result.value) {

        result.value.forEach(value => {
        if (value.length === 0) {
          Swal(
            'Error!',
            'Todos los campos son requeridos!',
            'error'
          );
          return;
        }
      });

      const url = `${this.urlService}/UpdateCustomer`;

      const customerToUpdate = new Customer(result.value[0], result.value[1], 0, Number(result.value[2]), customer.customerId);
      fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customerToUpdate)
        })
      .then(resp => {
        if (resp.ok) {
          Swal(
          'Guardado!',
          'Cliente guardado con exito!',
          'success'
        );
        this.LoadCustomers();
        }
      })
      .catch(console.error);
      }
    });
  }

  DeleteCustomer(customerId: number) {
    Swal({
      title: 'Eliminar cliente!',
      text: '¿Esta seguro de eliminar este cliente?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.value) {
        const url = `${this.urlService}/DeleteCustomerById/${customerId}`;

        fetch(url)
        .then(resp => {
          if (resp.ok) {
            Swal(
              'Eliminado!',
              'Cliente eliminado con exito!',
              'success'
            );
            this.LoadCustomers();
          }
        })
        .catch(console.error);
      }
    });
  }

  GetLastTenReservation(customerId: number) {
    const url = `${this.urlService}/GetLastTenReservationByCustomerId/${customerId}`;
    fetch(url)
    .then(result => result.json())
    .then(reservations => {
      console.log(reservations);
      let reservationsHTML = '<ul class="list-group">';
      reservations.forEach(element => {
        const startDate = new Date(element.startTime);
        const endDate = new Date(element.endTime);
        reservationsHTML += `<li class="list-group-item">Fecha Inicio: <strong>${startDate.toLocaleString()}</strong>
                                Fecha Fin: <strong>${endDate.toLocaleString()}</strong>
                                Precio total: <strong>${element.totalPrice}</strong></li>`;
      });
      reservationsHTML += '</ul>';
      Swal({
        title: 'Últimas 10 reservaciones',
        type: 'info',
        html: reservationsHTML,
        showCloseButton: true,
      });
    })
    .catch(console.error);
  }

}
