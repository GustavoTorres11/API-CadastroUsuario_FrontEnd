import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioListar } from '../models/usuario';
import { UsuarioService } from '../services/usuario';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tela-principal',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './tela-principal.html',
  styleUrls: ['./tela-principal.css']
})
export class TelaPrincipal implements OnInit {

  usuarios: UsuarioListar[] | any = [];
  usuariosGeral: UsuarioListar[] | any = [];
  searchTerm: string = '';

  ApiUrl = 'https://localhost:7135/';



  constructor(private router: Router, private serviceUsuario: UsuarioService, private readonly http: HttpClient) {
  }
  ngOnInit(): void {
    this.serviceUsuario.GetUsuarios().subscribe(response => {
      this.usuarios = response;
      this.usuariosGeral = response;
    })
  }

  irParaCadastroCliente() {
    this.router.navigate(['/cadastrocliente']);
  }

  deletar(id: string) {
    this.serviceUsuario.DeletarUsuario(id).subscribe(response => {
      console.log(response);
      // Atualiza a lista na tela
      this.usuarios = this.usuarios.filter((u: any) => u.id !== id);
    });
  }








  private getAuthHeaders() {
    // Verifica se o localStorage está disponível
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return token ? {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    } : {};
  }

  getUsuarios(): void {
    this.http.get<UsuarioListar[]>(this.ApiUrl, this.getAuthHeaders()).subscribe({
      next: (res) => {
        this.usuarios = res;
      },
      error: (err) => {
        console.error('Erro ao buscar usuários:', err);
      }
    });
  }

  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      this.getUsuarios(); // Recarrega todos os usuários se o termo estiver vazio
      return;
    }

    this.http.get<UsuarioListar[]>(this.ApiUrl, this.getAuthHeaders()).subscribe({
      next: (res) => {
        this.usuarios = res.filter(usuario =>
          (usuario.nome?.toLowerCase().includes(this.searchTerm.toLowerCase()) || '') ||
          (usuario.email?.toLowerCase().includes(this.searchTerm.toLowerCase()) || '') ||
          (usuario.telefone?.includes(this.searchTerm) || '')
        );
      },
      error: (err) => {
        console.error('Erro ao buscar usuários:', err);
      }
    });
  }

  editarUsuario(id: string): void {
    console.log('Editar usuário:', id);
  }

  removerUsuario(id: string): void {
    if (confirm('Tem certeza que deseja remover este usuário?')) {
      this.http.delete(`${this.ApiUrl}/${id}`, this.getAuthHeaders()).subscribe({
        next: () => {
          //this.usuarios = this.usuarios.filter(u => u.id !== id);
        },
        error: (err) => console.error('Erro ao remover usuário:', err)
      });
    }
  }
}