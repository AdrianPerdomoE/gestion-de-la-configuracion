import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PYMELogComponent } from './pymelog.component';

describe('PYMELogComponent', () => {
  let component: PYMELogComponent;
  let fixture: ComponentFixture<PYMELogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PYMELogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PYMELogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
