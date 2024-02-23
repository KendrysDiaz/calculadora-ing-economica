import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamworkComponent } from './teamwork.component';

describe('TeamworkComponent', () => {
  let component: TeamworkComponent;
  let fixture: ComponentFixture<TeamworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamworkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
