import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario';
import { UsuarioListar } from '../models/usuario';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.html',
  styleUrls: ['./usuario.css']
})
export class Usuario implements OnInit {

  usuario: UsuarioListar = {} as UsuarioListar;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.GetUsuario().subscribe({
      next: (response) => {
        console.log('Dados recebidos:', response);
        this.usuario = response;
      },
      error: (err) => {
        console.error('Erro ao buscar usuário:', err);
      }
    });
  }

  getInitials(name: string | undefined): string {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }
}