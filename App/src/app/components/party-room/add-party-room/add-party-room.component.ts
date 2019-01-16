import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { PartyRoom } from 'src/app/models/party-room.model';

@Component({
  selector: 'app-add-party-room',
  templateUrl: './add-party-room.component.html',
  styleUrls: ['./add-party-room.component.css']
})
export class AddPartyRoomComponent implements OnInit {

  urlService = 'http://localhost:59723/api/PartyRoom';
  types = [{key: 'Aire libre', value: 0}, {key: 'Sala vacía', value: 1}, {key: 'Sala amoblada', value: 2}];
  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      'PartyRoomName': new FormControl('', Validators.required),
      'PartyRoomDescription': new FormControl('', Validators.required),
      'PartyRoomType': new FormControl('0', Validators.required),
      'PartyRoomScreens': new FormControl(false),
      'PartyRoomSound': new FormControl(false),
      'PartyRoomAirConditioner': new FormControl(false),
      'PartyRoomVideoBeam': new FormControl(false),
      'PartyRoomLuxuryArmchairs': new FormControl(false),
      'PartyRoomPricePerHour': new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
  }

  SavePartyRoom() {
    if (this.form.invalid) {
      Swal(
        'Error!',
        'Todos los campos son requeridos!',
        'error'
      );
      return;
    }

    const url = `${this.urlService}/CreatePartyRoom`;

    const newPartyRoom = new PartyRoom(
      this.form.value['PartyRoomName'],
      this.form.value['PartyRoomDescription'],
      Number(this.form.value['PartyRoomType']),
      this.form.value['PartyRoomScreens'],
      this.form.value['PartyRoomSound'],
      this.form.value['PartyRoomAirConditioner'],
      this.form.value['PartyRoomVideoBeam'],
      this.form.value['PartyRoomLuxuryArmchairs'],
      Number(this.form.value['PartyRoomPricePerHour']),
      );

      fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPartyRoom)
        })
      .then(resul => resul.json())
      .then(partyRoom => {
        Swal(
          'Creado!',
          'Salon creado con exito!',
          'success'
        );
        this.form.reset();
      })
      .catch(console.error);
  }

}
