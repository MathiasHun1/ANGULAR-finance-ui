import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBudgetForm } from './edit-budget-form';

describe('EditBudgetForm', () => {
  let component: EditBudgetForm;
  let fixture: ComponentFixture<EditBudgetForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBudgetForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBudgetForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
