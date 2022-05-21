import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { ArticleModel } from 'src/app/models/article.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnChanges {

  @Input() editingArticle: ArticleModel;
  @Output() addArticleEmitter = new EventEmitter<ArticleModel>();
  articleTitle: string;
  articleJournal: string;
  articleAbstract: string;
  isEditing: boolean;

  constructor() { 
    this.editingArticle = {
      id: 0,
      title: '',
      journal: '',
      abstract: '',
      isEditing: false,
      isShowingAbstract: false,
    }

    this.articleTitle = "";
    this.articleJournal = "";
    this.articleAbstract = "";
    this.isEditing = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("Input cambio", changes);

    const data = changes['editingArticle'].currentValue
    
    if (data){
      this.articleTitle = data.title;
      this.articleJournal = data.journal;
      this.articleAbstract = data.abstract;
      this.isEditing = data.isEditing;
    }
  }

  ngOnInit(): void {
  }

  addArticle(){
    const payload = {
      id: 0,
      title: this.articleTitle,
      journal: this.articleJournal,
      abstract: this.articleAbstract,
      isEditing: false,
      isShowingAbstract: false,
    };

    this.addArticleEmitter.emit(payload);

    this.articleTitle = "";
    this.articleJournal = "";
    this.articleAbstract = "";
  }

}
