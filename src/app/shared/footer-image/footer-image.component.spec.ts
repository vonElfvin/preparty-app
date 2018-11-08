import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterImageComponent } from './footer-image.component';

describe('FooterImageComponent', () => {
  let component: FooterImageComponent;
  let fixture: ComponentFixture<FooterImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
