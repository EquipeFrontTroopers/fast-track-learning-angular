import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SelectActionComponent} from './select-action.component';
import {RouterTestingModule} from '@angular/router/testing';
import {ReactiveFormsModule} from '@angular/forms';

describe('O componente SelectActionComponent', () => {
  let component: SelectActionComponent;
  let fixture: ComponentFixture<SelectActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectActionComponent],
      imports: [RouterTestingModule, ReactiveFormsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser instanciado', () => {
    expect(component).toBeTruthy();
  });


});
