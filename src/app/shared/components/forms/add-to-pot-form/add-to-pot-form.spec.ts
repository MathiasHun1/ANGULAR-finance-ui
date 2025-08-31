import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToPotForm } from './add-to-pot-form';

describe('AddToPotForm', () => {
  let component: AddToPotForm;
  let fixture: ComponentFixture<AddToPotForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddToPotForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddToPotForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
