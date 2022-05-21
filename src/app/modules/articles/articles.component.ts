import { Component, OnInit } from '@angular/core';
import { ArticleModel, ArticleResponseModel } from 'src/app/models/article.model';
import { ArticlesService } from '../../services/articles.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  articleList: ArticleModel[];
  editingArticle: ArticleModel;
  addArticleForm: ArticleModel;
  constructor(private articleService: ArticlesService ) { 
    this.articleList = [];
    this.editingArticle = {
      id: 0,
      title: "",
      journal: "",
      abstract: "",
      isEditing: false,
      isShowingAbstract: false,
    }
    this.addArticleForm = {
      id: 0,
      title: "",
      journal: "",
      abstract: "",
      isEditing: false,
      isShowingAbstract: false,
    }
  }

  ngOnInit(): void {
    console.log(this.editingArticle);
    this.getArticleList();

    this.articleService.getArticles().subscribe(resp => {console.log(resp)}
    );


  }

  async getArticleList() {
    return await fetch('https://api.plos.org/search?q=title:DNA')
      .then((response) => response.json())
      .then((result) => {
        //docs = json.response.docs;
        this.articleList = result.response.docs.map((element: ArticleResponseModel, index: number) => {
          const payload = {
            id: index,
            title: element.title_display,
            journal: element.journal,
            abstract: element.abstract[0],
            isEditing: false,
            isShowingAbstract: false,
          }
          return Object.assign({}, payload);
        })
        console.log('json', result);
        console.log('articleList', this.articleList);
      });
  }

  editArticle(id: number){
    console.log('id', id);
    const index = this.articleList.findIndex((element) => element.id === id);
    this.articleList[index].isEditing = true;
    this.editingArticle = this.articleList[index];
  }

  cancelEdit(id: number){
    const index = this.articleList.findIndex((element) => element.id === id);
    this.articleList[index].isEditing = false;
    this.editingArticle = {
      id: 0,
      title: "",
      journal: "",
      abstract: "",
      isEditing: false,
      isShowingAbstract: false,
    }
  }

  addArticle(article: ArticleModel){
    const newArticle = Object.assign(article, {id: this.articleList.length}, {isEditing: false}, {isShowingAbstract: false});
    this.articleList.push(newArticle);
    console.log(this.articleList);
    this.addArticleForm = newArticle;
  }

  deleteArticle(id: number){
    const index = this.articleList.findIndex((element) => element.id === id);
    this.articleList.splice(index, 1);
  }

  editArticleForm(id: number){
    const index = this.articleList.findIndex((element) => element.id === id);
    this.articleList[index].isEditing = true;
    this.editingArticle = this.articleList[index];
  }

  cancelEditForm(id: number){
    const index = this.articleList.findIndex((element) => element.id === id);
    this.articleList[index].isEditing = false;
    this.editingArticle = {
      id: 0,
      title: "",
      journal: "",
      abstract: "",
      isEditing: false,
      isShowingAbstract: false,
    }
  }

  showAbstractForm(id: number){
    this.articleList[id].isShowingAbstract = !this.articleList[id].isShowingAbstract;
  }

  deleteArticleForm(id: number){
    const index = this.articleList.findIndex((element) => element.id === id);
    this.articleList.splice(index, 1);
  }

}

//Buscar object assing 