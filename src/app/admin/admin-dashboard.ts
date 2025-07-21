import { Component } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { get } from 'node:http';
import { response } from 'express';

interface Usuario {
  id: string;
  nome: string;
  email: string;
  senha?: string;
  endereco: string;
  cpf: string;
  telefone: string;
  role: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css'],
  imports: [HttpClientModule, FormsModule, CommonModule]
})
export class AdminDashboard {
  id: string | null = null;
  nome = '';
  endereco = '';
  cpf = '';
  telefone = '';
  usuarios: any[] = [];
  usuario: any = {};

  resultadoTrue: any;
  resultadoGet: any;
  resultado: any;

  isExpanded: boolean = false;

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

  post(): void {
    const body = {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      endereco: this.endereco,
      cpf: this.cpf,
      telefone: this.telefone
    };

    if (body.nome == null || body.email == null || body.senha == null || body.endereco == null || body.cpf == null || body.telefone == null) {
      const resultadoEl = document.getElementsByClassName("resultado")[0] as HTMLElement;
      if (resultadoEl) {
        resultadoEl.style.color = 'rgb(235, 94, 94)';
      } this.resultado = '';
      this.resultado = 'Preencha todos os campos';

    }
    else {
      this.resultado = '';
      const resultadoEl = document.getElementsByClassName("resultado")[0] as HTMLElement;
      if (resultadoEl) {
        resultadoEl.style.color = '#1f2937';
      }

      this.resultado = ''; // sempre quando chamar a função ele limpa a outra
      this.http.post("https://localhost:7135/api/Cadastro", body)
        .subscribe(() => this.resultadoTrue = "Usuario Cadastrado");
    }
  }

  getUsuariosExpandir(): void {
    this.http.get<Usuario[]>(this.apiUrl, this.getAuthHeaders()).subscribe({
      next: (res) => {
        this.usuarios = res;
        this.resultadoGet = 'Usuários carregados com sucesso';
        this.usuario = {};
        this.isExpanded = true; // Expande a caixa
      },
      error: (err) => {
        console.error('Erro ao buscar usuários:', err);
      }
    });
  }

  put() {
    if (!this.id) {
      this.resultado = "Informe o Id";
      this.resultadoTrue = '';

      const resultadoEl = document.getElementsByClassName("resultado")[0] as HTMLElement;
      if (resultadoEl) {
        resultadoEl.style.color = 'rgb(235, 94, 94)';
      }

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
      .subscribe(res => this.resultadoTrue = "Usuário Atualizado !");

  }

  delete() {
    if (!this.id) {
      this.resultado = "ID não informado";
      return;
    }

    this.http.delete(`${this.apiUrl}/${this.id}`, this.getAuthHeaders())
      .subscribe({
        next: () => this.resultadoTrue = "Usuário removido com sucesso",
        error: (err) => {
          console.error("Erro ao remover usuário:", err);
          this.resultado = "Erro ao remover usuário";
        }
      });
  }

  fechar(): void {
    this.isExpanded = false; // Encolhe a caixa
    this.usuarios = [];
    this.usuario = {};
    this.resultadoGet = '';
    this.resultadoTrue = '';
  }

  verificarId() {
    if (!(this.id) || this.id == null) {
      this.getUsuariosExpandir();
    } else {
      this.getUsuarioid();
    }
  }

  getUsuarioid(): void {
    this.http.get<Usuario>(`${this.apiUrl}/${this.id}`, this.getAuthHeaders()).subscribe({
      next: (res) => {
        this.usuario = res;
        this.resultadoTrue = 'Usuário carregado com sucesso';
        this.nome = res.nome || '';
        this.email = res.email || '';
        this.endereco = res.endereco || '';
        this.cpf = res.cpf || '';
        this.telefone = res.telefone || '';
        this.usuarios = [];
        this.isExpanded = true; // Expande a caixa
      },
      error: (err) => {
        console.error('Erro ao buscar usuário:', err);
        this.resultado = 'Erro ao buscar usuário';
      }
    });
  }
}