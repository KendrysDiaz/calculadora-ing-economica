import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestRatemessageComponent } from './interest-ratemessage.component';

describe('InterestRatemessageComponent', () => {
  let component: InterestRatemessageComponent;
  let fixture: ComponentFixture<InterestRatemessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterestRatemessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InterestRatemessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
