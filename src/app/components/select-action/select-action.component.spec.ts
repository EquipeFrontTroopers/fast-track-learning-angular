import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectActionComponent } from './select-action.component';

describe('SelectActionComponent', () => {
  let component: SelectActionComponent;
  let fixture: ComponentFixture<SelectActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
