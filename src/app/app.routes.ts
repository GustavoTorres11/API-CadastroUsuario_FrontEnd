import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Cadastro } from './cadastro/cadastro';
import { Home } from './home/home';
import { Admin } from './admin/admin';
import { AdminGuard } from './admin/admin.guard';


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'cadastro', component: Cadastro },
    { path: 'home', component: Home },
    { path: 'admin', component: Admin, canActivate: [AdminGuard] } // rota protegida
];