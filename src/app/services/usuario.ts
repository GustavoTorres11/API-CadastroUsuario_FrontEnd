import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioListar } from '../models/usuario';
import { Response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  ApiUrl = environment.UrlApi;

  constructor(private http: HttpClient) { }

  GetUsuarios(): Observable<Response<UsuarioListar[]>> {
    return this.http.get<Response<UsuarioListar[]>>(this.ApiUrl);
  }

  DeletarUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.ApiUrl}/${id}`);
  }

  CadastrarUsuario(usuario: any): Observable<any> {
    return this.http.post(this.ApiUrl, usuario);
  }

}
