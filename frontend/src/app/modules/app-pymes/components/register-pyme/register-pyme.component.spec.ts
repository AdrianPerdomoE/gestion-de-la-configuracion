import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPymeComponent } from './register-pyme.component';

describe('RegisterPymeComponent', () => {
  let component: RegisterPymeComponent;
  let fixture: ComponentFixture<RegisterPymeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterPymeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterPymeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
