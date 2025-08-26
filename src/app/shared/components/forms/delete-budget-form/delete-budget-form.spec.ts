import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBudgetForm } from './delete-budget-form';

describe('DeleteBudgetForm', () => {
  let component: DeleteBudgetForm;
  let fixture: ComponentFixture<DeleteBudgetForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteBudgetForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteBudgetForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
