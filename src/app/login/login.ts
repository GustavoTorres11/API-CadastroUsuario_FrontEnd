import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../services/login.services';
import { FormsModule } from '@angular/forms';
import { Home } from '../home/home';


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

  constructor(private loginService: LoginService, private router: Router) { }

  onSubmit() {
    this.loginService.login(this.email, this.senha).subscribe(
      resposta => {
        console.log('Login bem-sucedido!', resposta);
        this.router.navigate(['home'])
      },
      erro => {
        console.error('Erro ao fazer login', erro);
      }
    );
  }
}
