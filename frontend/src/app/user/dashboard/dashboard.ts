import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { BlogService } from '../../services/blog.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
   imports: [CommonModule],
  templateUrl: './dashboard.html'
})

export class UserDashboardComponent {
blogs: any[] = [];
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
 this.blogService.getUserBlogs().subscribe((res: any) => {
  this.blogs = res;
  this.cd.detectChanges(); 
    console.log('Blogs:', this.blogs);
     console.log('Is array?', Array.isArray(res));
  });
}
openBlog(blog: any) {
  this.blogService.markViewed(blog.id).subscribe(() => {
    // remove immediately from UI
    this.blogs = this.blogs.filter(b => b.id !== blog.id);
  });
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
