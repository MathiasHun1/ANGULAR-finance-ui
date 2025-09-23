import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAcountDeletion } from './confirm-acount-deletion';

describe('ConfirmAcountDeletion', () => {
  let component: ConfirmAcountDeletion;
  let fixture: ComponentFixture<ConfirmAcountDeletion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmAcountDeletion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmAcountDeletion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
