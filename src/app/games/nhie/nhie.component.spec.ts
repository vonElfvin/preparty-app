import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhieComponent } from './nhie.component';

describe('NhieComponent', () => {
  let component: NhieComponent;
  let fixture: ComponentFixture<NhieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
