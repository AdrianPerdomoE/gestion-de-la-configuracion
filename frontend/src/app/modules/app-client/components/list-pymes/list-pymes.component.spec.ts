import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPymesComponent } from './list-pymes.component';

describe('ListPymesComponent', () => {
  let component: ListPymesComponent;
  let fixture: ComponentFixture<ListPymesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPymesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPymesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
