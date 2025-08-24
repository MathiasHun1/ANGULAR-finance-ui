import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSelectInput } from './custom-select-input';

describe('CustomSelectInput', () => {
  let component: CustomSelectInput;
  let fixture: ComponentFixture<CustomSelectInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomSelectInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomSelectInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
