import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPotForm } from './add-pot-form';

describe('AddPotForm', () => {
  let component: AddPotForm;
  let fixture: ComponentFixture<AddPotForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPotForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPotForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
