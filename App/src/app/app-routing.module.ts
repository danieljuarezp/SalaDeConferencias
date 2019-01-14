import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './components/customer/customer.component';
import { PartyRoomComponent } from './components/party-room/party-room.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },
  { path: 'Clientes', component: CustomerComponent },
  { path: 'Salones', component: PartyRoomComponent },
  { path: 'Reservaciones', component: ReservationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
