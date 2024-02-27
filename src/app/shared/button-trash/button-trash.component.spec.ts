import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonTrashComponent } from './button-trash.component';

describe('ButtonTrashComponent', () => {
  let component: ButtonTrashComponent;
  let fixture: ComponentFixture<ButtonTrashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonTrashComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonTrashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
