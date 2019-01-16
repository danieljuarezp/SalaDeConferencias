import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/models/reservation.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-reservations-without-paying',
  templateUrl: './get-reservations-without-paying.component.html',
  styleUrls: ['./get-reservations-without-paying.component.css']
})
export class GetReservationsWithoutPayingComponent implements OnInit {

  urlService = 'http://localhost:59723/api/';
  reservations: Reservation[] = [];
  partyRooms: any[] = [];
  customers: any[] = [];
  loading = true;
  constructor() { }

  ngOnInit() {
    this.LoadCustomers();
    this.LoadPartyRooms();
    this.LoadReservations();
  }

  LoadPartyRooms() {
    const urlPartyRooms = `${this.urlService}PartyRoom/GetAllPartyRooms`;
    fetch(urlPartyRooms)
    .then(resul => resul.json())
    .then(partyRooms =>  {
      partyRooms.forEach(element => {
        this.partyRooms.push({key: element.partyRoomId, value: element.name});
      });
    })
    .catch(console.error);
  }

  LoadCustomers() {
    const urlCustomers = `${this.urlService}Customer/GetAllCustomers`;
    fetch(urlCustomers)
    .then(resul => resul.json())
    .then(customers =>  {
      customers.forEach(element => {
        this.customers.push({key: element.customerId, value: element.name});
      });
    })
    .catch(console.error);
  }

  LoadReservations() {
    const url = `${this.urlService}Reservation/GetReservationsWithoutPaying`;
    fetch(url)
    .then(resul => resul.json())
    .then(reservations =>  {
      this.reservations = reservations;
      this.loading = false;
    })
    .catch(console.error);
  }

  PayReservation(reservationId: number) {
    Swal({
      title: 'Pagar reservacion!',
      text: '¿Esta seguro de pagar esta reservacion?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Pagar'
    }).then((result) => {
      if (result.value) {
        const url = `${this.urlService}Reservation/PayReservation/${reservationId}`;

        fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          }
          })
        .then(resp => {
          if (resp.ok) {
            Swal(
              'Pagada!',
              'Reservacion pagada con exito!',
              'success'
            );
            this.LoadReservations();
          }
        })
        .catch(console.error);
      }
    });
  }

  GetPartyRoomName(partyRoomId: number) {
    let partyRoomName;
    this.partyRooms.forEach(name => {
      if (name.key === partyRoomId) {
        partyRoomName = name.value;
      }
    });
   return partyRoomName;
  }

  GetCustomerName(customerId: number) {
    let customerName;
    this.customers.forEach(name => {
      if (name.key === customerId) {
        customerName = name.value;
      }
    });
   return customerName;
  }
}
