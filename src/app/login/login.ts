import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { Home } from '../home/home';
import { AdminDashboard } from '../admin/admin-dashboard';
import { LoginService } from '../services/login.services';


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
      (      resposta: { token: string; role: string; }) => {
        console.log('Login bem-sucedido!', resposta);

        localStorage.setItem('token', resposta.token);

        if (resposta.role === 'admin') {
          this.router.navigate(['admin'])
        } else {
          this.router.navigate(['home'])
        }
      },
      (      erro: any) => {
        console.error('Erro ao fazer login', erro); 
      }
    );
  }
}
