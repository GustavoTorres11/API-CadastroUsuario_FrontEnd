import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../services/usuario';


@Component({
  selector: 'app-cadastrocliente',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './cadastrocliente.html',
  styleUrl: './cadastrocliente.css'
})
export class Cadastrocliente {

  constructor(private router: Router, private serviceUsuario: UsuarioService) {
  }

  irParaTelaPrincipal() {
    this.router.navigate(['/TelaPrincipal']);
  }

  Salvar() {
    
  }
}
