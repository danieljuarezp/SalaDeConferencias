import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPartyRoomComponent } from './add-party-room.component';

describe('AddPartyRoomComponent', () => {
  let component: AddPartyRoomComponent;
  let fixture: ComponentFixture<AddPartyRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPartyRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPartyRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
