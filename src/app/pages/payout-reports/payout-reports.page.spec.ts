import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PayoutReportsPage } from './payout-reports.page';

describe('PayoutReportsPage', () => {
  let component: PayoutReportsPage;
  let fixture: ComponentFixture<PayoutReportsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PayoutReportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
