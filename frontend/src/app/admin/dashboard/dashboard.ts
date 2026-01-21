import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { BlogService } from '../../services/blog.service';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './dashboard.html'
})
export class AdminDashboardComponent {

  blogs: any[] = [];

  title = '';
  content = '';

  editId: number | null = null;

  constructor(
    private auth: AuthService,
    private token: TokenService,
    private router: Router,
    private blogService: BlogService,
     private cd: ChangeDetectorRef 
  ) {
    this.loadBlogs();
  }

 loadBlogs() {
  this.blogService.getAll().subscribe((res: any) => {
       // debug
    this.blogs = res;
    console.log('Blogs:', this.blogs);
     this.cd.detectChanges();
  });
}

  save() {
    const data = { title: this.title, content: this.content };

    if (this.editId) {
      this.blogService.update(this.editId, data).subscribe(() => this.reset());
    } else {
      this.blogService.create(data).subscribe(() => this.reset());
    }
  }

  edit(blog: any) {
    this.title = blog.title;
    this.content = blog.content;
    this.editId = blog.id;
  }

  remove(id: number) {
    this.blogService.delete(id).subscribe(() => this.loadBlogs());
  }

  reset() {
    this.title = '';
    this.content = '';
    this.editId = null;
    this.loadBlogs();
  }

  logout() {
    this.auth.logout().subscribe({
      next: () => {
        this.token.clear();
        this.router.navigate(['/login']);
      },
      error: () => {
        this.token.clear();
        this.router.navigate(['/login']);
      }
    });
  }
}
