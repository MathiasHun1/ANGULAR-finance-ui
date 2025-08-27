import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePotForm } from './delete-pot-form';

describe('DeletePotForm', () => {
  let component: DeletePotForm;
  let fixture: ComponentFixture<DeletePotForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletePotForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletePotForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
