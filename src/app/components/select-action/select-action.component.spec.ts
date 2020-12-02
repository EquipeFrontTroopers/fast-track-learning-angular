import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SelectActionComponent} from './select-action.component';
import {RouterTestingModule} from '@angular/router/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {TokenService} from '../../core/service/token.service';

describe('O componente SelectActionComponent', () => {
  let component: SelectActionComponent;
  let fixture: ComponentFixture<SelectActionComponent>;
  let tokenService: TokenService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectActionComponent],
      imports: [RouterTestingModule, ReactiveFormsModule],
      providers: [TokenService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    tokenService = TestBed.inject(TokenService);
    spyOn(tokenService, 'getToken').and.returnValue('token');

    fixture = TestBed.createComponent(SelectActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser instânciado', () => {
    expect(component).toBeTruthy();
  });

  it('deve pegar o token', () => {
    const token = tokenService.getToken();
    expect(token).toEqual('token');
  });

});
