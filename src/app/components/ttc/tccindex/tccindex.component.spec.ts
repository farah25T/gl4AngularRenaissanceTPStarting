import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TccindexComponent } from './tccindex.component';

describe('TccindexComponent', () => {
  let component: TccindexComponent;
  let fixture: ComponentFixture<TccindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TccindexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TccindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
