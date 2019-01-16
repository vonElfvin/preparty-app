import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementCardComponent } from './statement-card.component';

describe('StatementCardComponent', () => {
  let component: StatementCardComponent;
  let fixture: ComponentFixture<StatementCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatementCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
