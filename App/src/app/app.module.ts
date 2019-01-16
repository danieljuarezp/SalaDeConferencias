import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { AddCustomerComponent } from './components/customer/add-customer/add-customer.component';
import { GetCustomersComponent } from './components/customer/get-customers/get-customers.component';
import { AddPartyRoomComponent } from './components/party-room/add-party-room/add-party-room.component';
import { GetPartyRoomsComponent } from './components/party-room/get-party-rooms/get-party-rooms.component';
import { AddReservationComponent } from './components/reservation/add-reservation/add-reservation.component';
import { GetReservationsComponent } from './components/reservation/get-reservations/get-reservations.component';
import { GetReservationsWithoutConfirmationComponent } from './components/reservation/get-reservations-without-confirmation/get-reservations-without-confirmation.component';
import { GetReservationsWithoutPayingComponent } from './components/reservation/get-reservations-without-paying/get-reservations-without-paying.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    AddCustomerComponent,
    GetCustomersComponent,
    AddPartyRoomComponent,
    GetPartyRoomsComponent,
    AddReservationComponent,
    GetReservationsComponent,
    GetReservationsWithoutConfirmationComponent,
    GetReservationsWithoutPayingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularDateTimePickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
