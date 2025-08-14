import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetCard } from './budget-card';

describe('BudgetCard', () => {
  let component: BudgetCard;
  let fixture: ComponentFixture<BudgetCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
