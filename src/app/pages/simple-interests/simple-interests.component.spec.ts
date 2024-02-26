import { ComponentFixture, TestBed } from '@angular/core/testing';
import SimpleInterestsComponent from './simple-interests.component';

describe('SimpleInterestsComponent', () => {
  let component: SimpleInterestsComponent;
  let fixture: ComponentFixture<SimpleInterestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleInterestsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SimpleInterestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
