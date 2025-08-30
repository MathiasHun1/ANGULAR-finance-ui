import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingStatus } from './loading-status';

describe('LoadingStatus', () => {
  let component: LoadingStatus;
  let fixture: ComponentFixture<LoadingStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingStatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingStatus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
