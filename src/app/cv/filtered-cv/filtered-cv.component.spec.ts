import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredCvComponent } from './filtered-cv.component';

describe('FilteredCvComponent', () => {
  let component: FilteredCvComponent;
  let fixture: ComponentFixture<FilteredCvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilteredCvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilteredCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
