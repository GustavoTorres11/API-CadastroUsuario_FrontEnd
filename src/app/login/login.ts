import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../services/login.services';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})

export class Login {
  email: string = '';
  senha: string = '';

  constructor(private loginService: LoginService) { }

  onSubmit() {
    this.loginService.login(this.email, this.senha).subscribe(
      resposta => {
        console.log('Login bem-sucedido!', resposta);
        // redirecionar ou salvar token
      },
      erro => {
        console.error('Erro ao fazer login', erro);
      }
    );
  }
}
