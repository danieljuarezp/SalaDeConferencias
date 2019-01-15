import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddCustomerComponent } from './components/customer/add-customer/add-customer.component';
import { GetCustomersComponent } from './components/customer/get-customers/get-customers.component';
import { AddPartyRoomComponent } from './components/party-room/add-party-room/add-party-room.component';

const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },
  { path: 'AgregarCliente', component: AddCustomerComponent },
  { path: 'ConsultarClientes', component: GetCustomersComponent },
  { path: 'AgregarSalon', component: AddPartyRoomComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
