import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../services/login.services';
import { FormsModule } from '@angular/forms';
import { Home } from '../home/home';
import { AdminDashboard } from '../admin/admin-dashboard';


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

        localStorage.setItem('token', resposta.token);
        localStorage.setItem('role', resposta.role);

        if (resposta.role === 'admin') {
          this.router.navigate(['admin'])
        } else {
          this.router.navigate(['home'])
        }
      },
      erro => {
        console.error('Erro ao fazer login', erro);
      }
    );
  }
}
