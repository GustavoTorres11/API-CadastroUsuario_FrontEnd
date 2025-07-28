import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioListar, UsuarioResult } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  ApiUrl = environment.UrlApi;
  ApiCad = environment.UrlCad;

  constructor(private http: HttpClient) { }

  GetUsuarios(): Observable<UsuarioListar[]> {
    return this.http.get<UsuarioListar[]>(this.ApiUrl);
  }

  DeletarUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.ApiUrl}/${id}`);
  }

  CriarUsuario(usuario: UsuarioListar): Observable<UsuarioResult> {
    return this.http.post<UsuarioResult>(this.ApiCad, usuario);
  }

  GetUsuarioId(id: string): Observable<UsuarioListar> {
    return this.http.get<UsuarioResult>(`${this.ApiUrl}/${id}`)
  }

  EditarUsuario(usuario: UsuarioListar): Observable<UsuarioResult> {
  return this.http.put<UsuarioResult>(`${this.ApiUrl}/${usuario.id}`, usuario);
}


  BuscarUsuarios(termo: string): Observable<UsuarioListar[]> {
    return this.http.get<UsuarioListar[]>(`${this.ApiUrl}/buscar?termo=${termo}`);
  }

}

