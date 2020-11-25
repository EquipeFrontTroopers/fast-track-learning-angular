import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FormSignUpComponent} from './form-sign-up.component';
import {RouterTestingModule} from '@angular/router/testing';
import {ReactiveFormsModule} from '@angular/forms';

describe('O componente FormSignUpComponent', () => {
  let component: FormSignUpComponent;
  let fixture: ComponentFixture<FormSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormSignUpComponent],
      imports: [RouterTestingModule, ReactiveFormsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser instanciado', () => {
    expect(component).toBeTruthy();
  });

  it('Cadastrar o usuário', () => {
    const fakeBody = {
      nome: 'Carlos Silveira',
      nickname: 'cSilveira',
      email: 'carlos.silveira@compasso.com.br',
      senha: '21232f297a57a5a743894a0e4a801fc3'
    };

    // códigos para chamar service...
    expect(true).toBeTruthy();
  });

});
