import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
    getToken(): string | null {
        return localStorage.getItem('token');
    }

    isAdmin(): boolean {
        const token = this.getToken();
        if (!token) return false;

        const decoded: any = jwtDecode(token);
        return decoded?.role === 'admin';
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }

    logout() {
        localStorage.removeItem('token');
    }
}

