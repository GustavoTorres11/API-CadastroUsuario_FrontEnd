import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioListar, UsuarioResult } from '../models/usuario';
import { Response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  ApiUrl = environment.UrlApi;
  ApiCad = environment.UrlCad;

  constructor(private http: HttpClient) { }

  GetUsuarios(): Observable<Response<UsuarioListar[]>> {
    return this.http.get<Response<UsuarioListar[]>>(this.ApiUrl);
  }

  DeletarUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.ApiUrl}/${id}`);
  }

  CriarUsuario(usuario: UsuarioListar): Observable<Response<UsuarioResult>> {
    return this.http.post<Response<UsuarioResult>>(this.ApiCad, usuario);
  }

}
