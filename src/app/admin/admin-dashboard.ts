import { Component } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css'],
  imports: [HttpClientModule, FormsModule, CommonModule]
})
export class AdminDashboard {
  id: number | null = null;
  nome = '';
  endereco = '';
  cpf = '';
  telefone = '';
  usuarios: any[] = [];


  resultado: any;
  resultadoGet: any;

  private apiUrl = 'https://localhost:7135/api/usuario';
  email: any;
  senha: any;

  constructor(private http: HttpClient) { }

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  post() {
    const body = {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      endereco: this.endereco,
      cpf: this.cpf,
      telefone: this.telefone
    };
    this.http.post("https://localhost:7135/api/Cadastro", body)
      .subscribe(() => this.resultado = "Usuario Cadastrado");
  }

  getUsuariosExpandir(): void {
    // Chama o get para buscar usuários
    this.http.get<any[]>(this.apiUrl, this.getAuthHeaders()).subscribe({
      next: (res) => {
        this.usuarios = res;
        this.resultadoGet = 'Usuários carregados com sucesso';

        // Após carregar, expande visualmente
        const box = document.getElementById('adminBox');
        const conteudo = document.getElementById('conteudo');
        const inputs = document.getElementById("inputs");

        if (box && conteudo && inputs) {
          box.classList.remove('admin-box');
          box.classList.add('admin-box-expanded');
          conteudo.style.display = 'block';
          inputs.style.display = 'none';
        }
      },
      error: (err) => {
        console.error('Erro ao buscar usuários:', err);
      }
    });
  }

  put() {
    if (!this.id) {
      this.resultado = "Informe o Id";
      return
    }
    const body = {
      id: this.id,
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      endereco: this.endereco,
      cpf: this.cpf,
      telefone: this.telefone
    };

    this.http.put(`${this.apiUrl}/${this.id}`, body, this.getAuthHeaders())
      .subscribe(res => this.resultado = res);
  }

  delete() {
    if (!this.id) {
      this.resultado = "ID não informado";
      return;
    }

    this.http.delete(`${this.apiUrl}/${this.id}`, this.getAuthHeaders())
      .subscribe({
        next: () => this.resultado = "Usuário removido com sucesso",
        error: (err) => {
          console.error("Erro ao remover usuário:", err);
          this.resultado = "Erro ao remover usuário";
        }
      });

  }
  fechar() {

    const box = document.getElementById('adminBox');
    const conteudo = document.getElementById('conteudo');
    const inputs = document.getElementById("inputs");

    if (box && conteudo && inputs) {
      box.classList.remove('admin-box-expanded');
      box.classList.add('admin-box');
      conteudo.style.display = 'none';
      inputs.style.display = 'block';
    }
  };
}
