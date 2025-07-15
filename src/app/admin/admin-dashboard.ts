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
  email = '';
  resultado: any;

  private apiUrl = 'https://localhost:7135/api/usuario';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  post() {
    const body = { nome: this.nome, email: this.email, senha: '123' };
    this.http.post(this.apiUrl, body, this.getAuthHeaders())
      .subscribe(res => this.resultado = res);
  }

  get() {
    this.http.get(this.apiUrl, this.getAuthHeaders())
      .subscribe(res => this.resultado = res);
  }

  put() {
    if (!this.id) return alert('Informe o ID');
    const body = { id: this.id, nome: this.nome, email: this.email, senha: '123' };
    this.http.put(`${this.apiUrl}/${this.id}`, body, this.getAuthHeaders())
      .subscribe(res => this.resultado = res);
  }

  delete() {
    if (!this.id) return alert('Informe o ID');

    this.http.delete(`${this.apiUrl}/${this.id}`, this.getAuthHeaders())
      .subscribe(res => this.resultado = "Usuario removido");
  }
}
