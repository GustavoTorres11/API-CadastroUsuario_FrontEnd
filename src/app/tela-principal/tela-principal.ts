import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioListar } from '../models/usuario';
import { UsuarioService } from '../services/usuario';
import { Router, ActivatedRoute } from '@angular/router';
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
  mensagem: string = '';

  ApiUrl = 'https://localhost:7135/';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private serviceUsuario: UsuarioService,
    private readonly http: HttpClient
  ) { }

  ngOnInit(): void {
    this.serviceUsuario.GetUsuarios().subscribe(response => {
      this.usuarios = response;
      this.usuariosGeral = response;
    });

    this.route.queryParams.subscribe(params => {
      this.mensagem = params['msg'] || '';
      if (this.mensagem) {
        setTimeout(() => {
          this.mensagem = '';
        }, 3000);
      }
    });
  }

  irParaCadastroCliente() {
    this.router.navigate(['/cadastrocliente']);
  }

  editarCliente(id: string) {
    this.router.navigate(['/editar', id]);
  }

  deletar(id: string) {
    this.serviceUsuario.DeletarUsuario(id).subscribe(response => {
      console.log(response);
      this.usuarios = this.usuarios.filter((u: any) => u.id !== id);
      this.mensagem = 'Usuário deletado com sucesso!';
      setTimeout(() => {
        this.mensagem = '';
      }, 3000);
    });
  }

  buscarUsuarios() {
    const termo = this.searchTerm.trim();

    if (!termo) {
      this.usuarios = this.usuariosGeral;
      return;
    }

    this.serviceUsuario.BuscarUsuarios(termo).subscribe({
      next: (res) => {
        this.usuarios = res;
      },
      error: (err) => {
        console.error('Erro ao buscar usuários:', err);
      }
    });
  }
}
