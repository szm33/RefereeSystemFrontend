import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrivalTimePickerComponent } from './arrival-time-picker.component';

describe('ArrivalTimePickerComponent', () => {
  let component: ArrivalTimePickerComponent;
  let fixture: ComponentFixture<ArrivalTimePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrivalTimePickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrivalTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
