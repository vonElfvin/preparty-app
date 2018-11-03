import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhieCardComponent } from './nhie-card.component';

describe('NhieCardComponent', () => {
  let component: NhieCardComponent;
  let fixture: ComponentFixture<NhieCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhieCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhieCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
