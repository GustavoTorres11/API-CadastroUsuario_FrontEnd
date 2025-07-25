import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../services/usuario';
import { Formulario } from '../formulario/formulario';
import { UsuarioListar } from '../models/usuario';


@Component({
  selector: 'app-cadastrocliente',
  imports: [RouterModule, FormsModule, CommonModule, Formulario],
  templateUrl: './cadastrocliente.html',
  styleUrl: './cadastrocliente.css'
})
export class Cadastrocliente {

  constructor(private router: Router, private serviceUsuario: UsuarioService) {
  }

  criarUsuario(usuario: UsuarioListar) {
    this.serviceUsuario.CriarUsuario(usuario).subscribe(response => {
      this.router.navigate(['/TelaPrincipal']);
    })
  }

  irParaTelaPrincipal() {
    this.router.navigate(['/TelaPrincipal']);
  }

  Salvar() {

  }
}
