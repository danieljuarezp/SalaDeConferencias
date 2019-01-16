import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Reservation } from 'src/app/models/reservation.model';
import { Customer } from 'src/app/models/customer.model';
import { PartyRoom } from 'src/app/models/party-room.model';
import * as moment from 'moment';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css']
})
export class AddReservationComponent implements OnInit {

  urlService = 'http://localhost:59723/api/';
  partyRooms: PartyRoom[] = [];
  firstPartyRoomId: string;
  customers: Customer[] = [];
  firstCustomerId: string;
  form: FormGroup;
  startDate: Date = new Date();
  endDate: Date = new Date();
 settings = {
    bigBanner: true,
    format: 'dd-MMM-yyyy hh:mm a',
    defaultOpen: false,
    timePicker: true,
    closeOnSelect: true
 };
 selectedStartTime = false;
 selectedEndTime = false;

  constructor() {
    this.form = new FormGroup({
      'ReservationPartyRoom': new FormControl(Validators.required),
      'ReservationCustomers': new FormControl(Validators.required),
      'ReservationStartTime': new FormControl('', Validators.required),
      'ReservationEndTime': new FormControl('', Validators.required),
      'ReservationTotalPrice': new FormControl('', Validators.required),
      'ReservationAlreadyPaid': new FormControl(false, Validators.required),
      'ReservationConfirmed': new FormControl(false, Validators.required),
    });
  }

  ngOnInit() {
    this.LoadCustomers();
    this.LoadPartyRooms();
  }

  LoadPartyRooms() {
    const urlPartyRooms = `${this.urlService}PartyRoom/GetAllPartyRooms`;
    fetch(urlPartyRooms)
    .then(resul => resul.json())
    .then(partyRooms =>  {
      this.partyRooms = partyRooms;
      this.firstPartyRoomId = partyRooms[0].partyRoomId;
    })
    .catch(console.error);
  }

  LoadCustomers() {
    const urlCustomers = `${this.urlService}Customer/GetAllCustomers`;
    fetch(urlCustomers)
    .then(resul => resul.json())
    .then(customers =>  {
      this.customers = customers;
      this.firstCustomerId = customers[0].customerId;
    })
    .catch(console.error);
  }

  SaveReservation() {
      const urlSaveReservation = `${this.urlService}Reservation/CreateReservation`;

       const newReservation = new Reservation(
        Number(this.form.value['ReservationPartyRoom']),
        Number(this.form.value['ReservationCustomers']),
        moment(this.form.value['ReservationStartTime']).toDate(),
        moment(this.form.value['ReservationEndTime']).toDate(),
        Number(this.form.value['ReservationTotalPrice']),
        this.form.value['ReservationAlreadyPaid'],
        this.form.value['ReservationConfirmed']
      );

       fetch(urlSaveReservation, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newReservation)
        })
      .then(resul => resul.json())
      .then(reservation => {
        if (reservation.message !== undefined) {
          Swal(
            'Error!',
            reservation.message,
            'error'
          );
        } else {
          Swal(
            'Creado!',
            'Salon creado con exito!',
            'success'
          );
          this.form.reset();
        }
      })
      .catch(console.error);
  }
}
