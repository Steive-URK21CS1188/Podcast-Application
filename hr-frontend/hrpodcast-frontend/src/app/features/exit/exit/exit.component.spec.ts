import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitComponent } from './exit.component';

describe('ExitComponent', () => {
  let component: ExitComponent;
  let fixture: ComponentFixture<ExitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExitComponent]
    });
    fixture = TestBed.createComponent(ExitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
