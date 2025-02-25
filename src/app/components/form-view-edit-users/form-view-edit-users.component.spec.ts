import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormViewEditUsersComponent } from './form-view-edit-users.component';

describe('FormViewEditUsersComponent', () => {
  let component: FormViewEditUsersComponent;
  let fixture: ComponentFixture<FormViewEditUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormViewEditUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormViewEditUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
