export interface UsuarioListar {
  id: string;
  nome: string;
  email: string;
  senha?: string;
  endereco: string;
  cpf: string;
  telefone: string;
  role: string;
}