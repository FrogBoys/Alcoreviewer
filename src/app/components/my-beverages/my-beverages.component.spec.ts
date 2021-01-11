import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBeveragesComponent } from './my-beverages.component';

describe('MyBeveragesComponent', () => {
  let component: MyBeveragesComponent;
  let fixture: ComponentFixture<MyBeveragesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyBeveragesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBeveragesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
