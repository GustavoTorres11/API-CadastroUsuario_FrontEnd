import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../services/usuario';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsuarioListar } from '../models/usuario';


@Component({
  selector: 'app-formulario',
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css'
})
export class Formulario implements OnInit {

  @Output() onSubmit = new EventEmitter<UsuarioListar>();

  usuarioForm!: FormGroup;

  constructor(private router: Router, private serviceUsuario: UsuarioService) {
  }
  ngOnInit(): void {
    this.usuarioForm = new FormGroup({
      id: new FormControl(0),
      nome: new FormControl(''),
      email: new FormControl(''),
      senha: new FormControl(''),
      telefone: new FormControl(''),
      cpf: new FormControl(''),
      endereco: new FormControl(''),
    });
  }

  irParaTelaPrincipal() {
    this.router.navigate(['/TelaPrincipal']);
  }

  submit() {
    this.onSubmit.emit(this.usuarioForm.value);
  }

  Salvar() {

  }
}

