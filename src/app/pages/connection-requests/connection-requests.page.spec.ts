import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConnectionRequestsPage } from './connection-requests.page';

describe('ConnectionRequestsPage', () => {
  let component: ConnectionRequestsPage;
  let fixture: ComponentFixture<ConnectionRequestsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionRequestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
