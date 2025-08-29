import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodeCreateComponent } from './episode-create.component';

describe('EpisodeCreateComponent', () => {
  let component: EpisodeCreateComponent;
  let fixture: ComponentFixture<EpisodeCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EpisodeCreateComponent]
    });
    fixture = TestBed.createComponent(EpisodeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
