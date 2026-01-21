import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule, RouterModule],
  templateUrl: './login.html'
})

export class LoginComponent {

  email = '';
  password = '';
  error = '';

  constructor(
    private auth: AuthService,
    private token: TokenService,
    private router: Router
  ) {}

  login() {
    this.auth.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        this.token.save(res.token);

        if (res.user.role.name === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user']);
        }
      },
      error: () => this.error = 'Invalid credentials'
    });
  }
}
