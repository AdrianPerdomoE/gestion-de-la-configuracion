import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingKartItemComponent } from './shopping-kart-item.component';

describe('ShoppingKartItemComponent', () => {
  let component: ShoppingKartItemComponent;
  let fixture: ComponentFixture<ShoppingKartItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingKartItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingKartItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
