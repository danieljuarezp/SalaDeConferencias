import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPartyRoomsComponent } from './get-party-rooms.component';

describe('GetPartyRoomsComponent', () => {
  let component: GetPartyRoomsComponent;
  let fixture: ComponentFixture<GetPartyRoomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetPartyRoomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetPartyRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
