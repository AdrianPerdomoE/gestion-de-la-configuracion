import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarClientComponent } from './side-bar-client.component';

describe('SideBarClientComponent', () => {
  let component: SideBarClientComponent;
  let fixture: ComponentFixture<SideBarClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideBarClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideBarClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
