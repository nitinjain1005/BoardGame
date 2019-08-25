import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminvistordetailsComponent } from './adminvistordetails.component';

describe('AdminvistordetailsComponent', () => {
  let component: AdminvistordetailsComponent;
  let fixture: ComponentFixture<AdminvistordetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminvistordetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminvistordetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
