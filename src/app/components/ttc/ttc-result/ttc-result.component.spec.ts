import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TTCResultComponent } from './ttc-result.component';

describe('TTCResultComponent', () => {
  let component: TTCResultComponent;
  let fixture: ComponentFixture<TTCResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TTCResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TTCResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
