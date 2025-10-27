import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeCityPage } from './change-city.page';

describe('ChangeCityPage', () => {
  let component: ChangeCityPage;
  let fixture: ComponentFixture<ChangeCityPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeCityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
