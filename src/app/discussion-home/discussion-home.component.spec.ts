import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionHomeComponent } from './discussion-home.component';

describe('DiscussionHomeComponent', () => {
  let component: DiscussionHomeComponent;
  let fixture: ComponentFixture<DiscussionHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscussionHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussionHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
