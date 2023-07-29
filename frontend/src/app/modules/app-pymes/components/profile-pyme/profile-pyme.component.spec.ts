import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePymeComponent } from './profile-pyme.component';

describe('ProfilePymeComponent', () => {
  let component: ProfilePymeComponent;
  let fixture: ComponentFixture<ProfilePymeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePymeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePymeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
