import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefereeCreateComponent } from './referee-create.component';

describe('RefereeCreateComponent', () => {
  let component: RefereeCreateComponent;
  let fixture: ComponentFixture<RefereeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefereeCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefereeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
