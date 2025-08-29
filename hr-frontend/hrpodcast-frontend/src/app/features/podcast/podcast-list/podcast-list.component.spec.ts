import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastListComponent } from './podcast-list.component';

describe('PodcastListComponent', () => {
  let component: PodcastListComponent;
  let fixture: ComponentFixture<PodcastListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PodcastListComponent]
    });
    fixture = TestBed.createComponent(PodcastListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
