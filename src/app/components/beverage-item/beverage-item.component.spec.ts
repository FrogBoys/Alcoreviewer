import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeverageItemComponent } from './beverage-item.component';

describe('BeverageItemComponent', () => {
  let component: BeverageItemComponent;
  let fixture: ComponentFixture<BeverageItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeverageItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeverageItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
