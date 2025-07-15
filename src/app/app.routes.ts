import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Cadastro } from './cadastro/cadastro';
import { Home } from './home/home';
import { AdminDashboard } from './admin/admin-dashboard';
import { AdminGuard } from './admin/admin.guard';


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'cadastro', component: Cadastro },
    { path: 'home', component: Home },
    
    {   
        path: 'admin',
        canActivate: [AdminGuard],
        children: [
            {path: '', component: AdminDashboard },
            {path: 'outra-coisa', component: AdminDashboard},
        ]
    }
];