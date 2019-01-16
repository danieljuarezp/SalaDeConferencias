import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddCustomerComponent } from './components/customer/add-customer/add-customer.component';
import { GetCustomersComponent } from './components/customer/get-customers/get-customers.component';
import { AddPartyRoomComponent } from './components/party-room/add-party-room/add-party-room.component';
import { GetPartyRoomsComponent } from './components/party-room/get-party-rooms/get-party-rooms.component';
import { AddReservationComponent } from './components/reservation/add-reservation/add-reservation.component';
import { GetReservationsComponent } from './components/reservation/get-reservations/get-reservations.component';
import { GetReservationsWithoutConfirmationComponent } from './components/reservation/get-reservations-without-confirmation/get-reservations-without-confirmation.component';
import { GetReservationsWithoutPayingComponent } from './components/reservation/get-reservations-without-paying/get-reservations-without-paying.component';

const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },
  { path: 'AgregarCliente', component: AddCustomerComponent },
  { path: 'ConsultarClientes', component: GetCustomersComponent },
  { path: 'AgregarSalon', component: AddPartyRoomComponent },
  { path: 'ConsultarSalones', component: GetPartyRoomsComponent },
  { path: 'AgregarReservacion', component: AddReservationComponent },
  { path: 'ConsultarReservacion', component: GetReservationsComponent },
  { path: 'ReservacionesPorConfirmar', component: GetReservationsWithoutConfirmationComponent },
  { path: 'ReservacionesPorPagar', component: GetReservationsWithoutPayingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
