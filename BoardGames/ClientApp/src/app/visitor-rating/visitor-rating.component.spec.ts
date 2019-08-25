import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorRatingComponent } from './visitor-rating.component';

describe('VisitorRatingComponent', () => {
  let component: VisitorRatingComponent;
  let fixture: ComponentFixture<VisitorRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
