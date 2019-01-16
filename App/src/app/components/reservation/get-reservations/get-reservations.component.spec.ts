import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetReservationsComponent } from './get-reservations.component';

describe('GetReservationsComponent', () => {
  let component: GetReservationsComponent;
  let fixture: ComponentFixture<GetReservationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetReservationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
