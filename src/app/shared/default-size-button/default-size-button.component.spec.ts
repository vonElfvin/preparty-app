import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultSizeButtonComponent } from './default-size-button.component';

describe('DefaultSizeButtonComponent', () => {
  let component: DefaultSizeButtonComponent;
  let fixture: ComponentFixture<DefaultSizeButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultSizeButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultSizeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
