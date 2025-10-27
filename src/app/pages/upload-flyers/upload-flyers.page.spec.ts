import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadFlyersPage } from './upload-flyers.page';

describe('UploadFlyersPage', () => {
  let component: UploadFlyersPage;
  let fixture: ComponentFixture<UploadFlyersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFlyersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
