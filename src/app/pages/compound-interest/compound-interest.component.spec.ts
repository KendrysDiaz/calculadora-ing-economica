import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoundInterestComponent } from './compound-interest.component';

describe('CompoundInterestComponent', () => {
  let component: CompoundInterestComponent;
  let fixture: ComponentFixture<CompoundInterestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompoundInterestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompoundInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
