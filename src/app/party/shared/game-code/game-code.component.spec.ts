import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCodeComponent } from './game-code.component';

describe('GameCodeComponent', () => {
  let component: GameCodeComponent;
  let fixture: ComponentFixture<GameCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
