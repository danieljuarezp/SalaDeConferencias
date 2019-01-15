import { Component, OnInit } from '@angular/core';
import { PartyRoom } from 'src/app/models/party-room.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-party-rooms',
  templateUrl: './get-party-rooms.component.html',
  styleUrls: ['./get-party-rooms.component.css']
})
export class GetPartyRoomsComponent implements OnInit {

  urlService = 'http://localhost:59723/api/PartyRoom';
  types = [{key: 'Aire libre', value: 0}, {key: 'Sala vacía', value: 1}, {key: 'Sala amoblada', value: 2}];
  partyRooms: PartyRoom[] = [];
  loading = true;

  constructor() { }

  ngOnInit() {
    this.LoadPartyRooms();
  }

  LoadPartyRooms() {
    this.loading = true;
    const url = `${this.urlService}/GetAllPartyRooms`;
    fetch(url)
    .then(resul => resul.json())
    .then(partyRooms =>  {
      this.partyRooms = partyRooms;
      this.loading = false;
    })
    .catch(console.error);
  }

  UpdatePartyRoom(partyRoom: any) {

    let dropdown = '<label>Tipo</label><select class="swal2-input" id="type">';
    this.types.forEach(element => {
      dropdown += `<option value="${element.value}">${element.key}</option>`;
    });
    dropdown += '</select>';

    const checked = (element) => {
      return element ? 'checked' : '';
    };

    Swal({
      title: 'Editar salon!',
      html:
    `<br>
     <label>Nombre</label><input id="name" class="swal2-input" value="${partyRoom.name}">
     <label>Descripcion</label><input id="description" class="swal2-input"  value="${partyRoom.description}">
     ${dropdown}
     <label>Precio por hora</label><input id="pricePerHour" class="swal2-input"  value="${partyRoom.pricePerHour}">
     <div class="checkbox"><label><input type="checkbox" id="screens" ${checked(partyRoom.screens)}> Pantallas</label></div>
     <div class="checkbox"><label><input type="checkbox" id="sound" ${checked(partyRoom.sound)}> Equipo de sonido</label></div>
     <div class="checkbox"><label><input type="checkbox" id="airConditioner" ${checked(partyRoom.airConditioner)}> Aire acondicionado</label></div>
     <div class="checkbox"><label><input type="checkbox" id="videoBeam" ${checked(partyRoom.videoBeam)}> Video Beam</label></div>
     <div class="checkbox"><label><input type="checkbox" id="luxuryArmchairs" ${checked(partyRoom.luxuryArmchairs)}> Butacas de lujo</label></div>
     `,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar',
      preConfirm: () => {
        return [
          (<HTMLInputElement>document.getElementById('name')).value.trim(),
          (<HTMLInputElement>document.getElementById('description')).value.trim(),
          (<HTMLInputElement>document.getElementById('type')).value.trim(),
          (<HTMLInputElement>document.getElementById('pricePerHour')).value.trim(),
          (<HTMLInputElement>document.getElementById('screens')).checked,
          (<HTMLInputElement>document.getElementById('sound')).checked,
          (<HTMLInputElement>document.getElementById('airConditioner')).checked,
          (<HTMLInputElement>document.getElementById('videoBeam')).checked,
          (<HTMLInputElement>document.getElementById('luxuryArmchairs')).checked
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

       const url = `${this.urlService}/UpdatePartyRoom`;

       const partyRoomToUpdate = new PartyRoom(
         result.value[0],
         result.value[1],
         Number(result.value[2]),
         result.value[4],
         result.value[5],
         result.value[6],
         result.value[7],
         result.value[8],
         Number(result.value[3]),
         partyRoom.partyRoomId
         );

       fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(partyRoomToUpdate)
        })
      .then(resp => {
        if (resp.ok) {
          Swal(
          'Guardado!',
          'Salon guardado con exito!',
          'success'
        );
        this.LoadPartyRooms();
        }
      })
      .catch(console.error);
      }
    });
  }

  DeletePartyRoom(partyRoomId: number) {
    Swal({
      title: 'Eliminar salon!',
      text: '¿Esta seguro de eliminar este salon?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.value) {
        const url = `${this.urlService}/DeletePartyRoomById/${partyRoomId}`;

        fetch(url)
        .then(resp => {
          if (resp.ok) {
            Swal(
              'Eliminado!',
              'Salon eliminado con exito!',
              'success'
            );
            this.LoadPartyRooms();
          }
        })
        .catch(console.error);
      }
    });
  }

}
