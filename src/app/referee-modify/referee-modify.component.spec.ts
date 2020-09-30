import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefereeModifyComponent } from './referee-modify.component';

describe('RefereeModifyComponent', () => {
  let component: RefereeModifyComponent;
  let fixture: ComponentFixture<RefereeModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefereeModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefereeModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
