import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPotForm } from './edit-pot-form';

describe('EditPotForm', () => {
  let component: EditPotForm;
  let fixture: ComponentFixture<EditPotForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPotForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPotForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
