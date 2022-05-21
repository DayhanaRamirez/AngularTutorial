import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArticleResponseModel } from 'src/app/models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private http: HttpClient) { }

  public getArticles(): Observable<ArticleResponseModel[]>{
    return this.http.get<ArticleResponseModel[]>('https://api.plos.org/search?q=title:DNA')
  }
}
