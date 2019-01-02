import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingGameComponent } from './voting-game.component';

describe('VotingGameComponent', () => {
  let component: VotingGameComponent;
  let fixture: ComponentFixture<VotingGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotingGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
