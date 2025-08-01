import { Component } from '@angular/core';
import { UsuarioService } from '../services/usuario';
import { UsuarioListar } from '../models/usuario';

@Component({
  selector: 'app-usuario',
  imports: [],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css'
})
export class Usuario {
  usuario!: UsuarioListar;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.GetUsuario().subscribe(response => {
      console.log('Dados recebidos', response);
      this.usuario = response;
    });
  }
}