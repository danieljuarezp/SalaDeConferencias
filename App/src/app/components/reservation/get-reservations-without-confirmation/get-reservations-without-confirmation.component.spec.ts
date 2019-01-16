import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetReservationsWithoutConfirmationComponent } from './get-reservations-without-confirmation.component';

describe('GetReservationsWithoutConfirmationComponent', () => {
  let component: GetReservationsWithoutConfirmationComponent;
  let fixture: ComponentFixture<GetReservationsWithoutConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetReservationsWithoutConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetReservationsWithoutConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
