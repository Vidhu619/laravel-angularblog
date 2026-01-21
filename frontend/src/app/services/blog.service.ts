import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({ providedIn: 'root' })
export class BlogService {

  private API = 'http://127.0.0.1:8000/api/blogs';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  private getHeaders() {
    const token = this.tokenService.get();

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }
  getUserBlogs() {
  return this.http.get('http://127.0.0.1:8000/api/user/blogs', {
    headers: this.getHeaders()
  });
}
markViewed(id: number) {
  return this.http.post(`http://127.0.0.1:8000/api/blogs/${id}/view`, {}, {
    headers: this.getHeaders()
  });
}

  getAll() {
    return this.http.get(this.API, { headers: this.getHeaders() });
  }

  create(data: any) {
    return this.http.post(this.API, data, { headers: this.getHeaders() });
  }

  update(id: number, data: any) {
    return this.http.put(`${this.API}/${id}`, data, { headers: this.getHeaders() });
  }

  delete(id: number) {
    return this.http.delete(`${this.API}/${id}`, { headers: this.getHeaders() });
  }
}
