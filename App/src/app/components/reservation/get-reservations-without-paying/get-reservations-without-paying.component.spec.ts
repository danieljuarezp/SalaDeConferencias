import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetReservationsWithoutPayingComponent } from './get-reservations-without-paying.component';

describe('GetReservationsWithoutPayingComponent', () => {
  let component: GetReservationsWithoutPayingComponent;
  let fixture: ComponentFixture<GetReservationsWithoutPayingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetReservationsWithoutPayingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetReservationsWithoutPayingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
