import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormViewEditRequestComponent } from './form-view-edit-request.component';

describe('FormViewEditRequestComponent', () => {
  let component: FormViewEditRequestComponent;
  let fixture: ComponentFixture<FormViewEditRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormViewEditRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormViewEditRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
