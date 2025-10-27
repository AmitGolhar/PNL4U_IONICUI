import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfluencerPromotionsPage } from './influencer-promotions.page';

describe('InfluencerPromotionsPage', () => {
  let component: InfluencerPromotionsPage;
  let fixture: ComponentFixture<InfluencerPromotionsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InfluencerPromotionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
