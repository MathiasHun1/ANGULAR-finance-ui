import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawFromPotForm } from './withdraw-from-pot-form';

describe('WithdrawFromPotForm', () => {
  let component: WithdrawFromPotForm;
  let fixture: ComponentFixture<WithdrawFromPotForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithdrawFromPotForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithdrawFromPotForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
