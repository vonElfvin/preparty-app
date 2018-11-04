import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManualQuestionComponent } from './add-manual-question.component';

describe('AddManualQuestionComponent', () => {
  let component: AddManualQuestionComponent;
  let fixture: ComponentFixture<AddManualQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddManualQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddManualQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
