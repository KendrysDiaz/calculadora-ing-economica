import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeCheckComponent } from './time-check.component';

describe('TimeCheckComponent', () => {
  let component: TimeCheckComponent;
  let fixture: ComponentFixture<TimeCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeCheckComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimeCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
