import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySubscriptionsComponent } from './my-subscriptions.component';

describe('MySubscriptionsComponent', () => {
  let component: MySubscriptionsComponent;
  let fixture: ComponentFixture<MySubscriptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MySubscriptionsComponent]
    });
    fixture = TestBed.createComponent(MySubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
