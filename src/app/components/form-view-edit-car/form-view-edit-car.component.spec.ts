import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormViewEditCarComponent } from './form-view-edit-car.component';

describe('FormViewEditCarComponent', () => {
  let component: FormViewEditCarComponent;
  let fixture: ComponentFixture<FormViewEditCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormViewEditCarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormViewEditCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
