import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchModifyComponent } from './match-modify.component';

describe('MatchModifyComponent', () => {
  let component: MatchModifyComponent;
  let fixture: ComponentFixture<MatchModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
