import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBudgetForm } from './add-budget-form';

describe('AddBudgetForm', () => {
  let component: AddBudgetForm;
  let fixture: ComponentFixture<AddBudgetForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBudgetForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBudgetForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
