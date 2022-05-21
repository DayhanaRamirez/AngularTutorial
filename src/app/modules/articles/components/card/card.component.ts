import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ArticleModel } from '../../../../models/article.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() article: ArticleModel;
  @Output() editArticleEmitter = new EventEmitter<number>();
  @Output() cancelEditingEmitter = new EventEmitter<number>();
  @Output() deleteArticleEmitter = new EventEmitter<number>();
  isShowingAbstract: boolean;

  constructor() {
    this.article = {
      id: 0,
      title: '',
      journal: '',
      abstract: '',
      isEditing: false,
      isShowingAbstract: false,
    },
    this.isShowingAbstract = true;
   }

  ngOnInit(): void {
  }

  getImageSource(){
    return this.article.journal.toLowerCase().includes('plos one') ? 'assets/img/plos.png' : 'assets/img/not_found.png'
  }

  editArticle(){
    this.editArticleEmitter.emit(this.article.id);
  }

  cancelEdit(){
    this.cancelEditingEmitter.emit(this.article.id);
  }

  deleteArticle(){
    this.deleteArticleEmitter.emit(this.article.id);
  }

  showAbstract(){
    this.isShowingAbstract = !this.isShowingAbstract;
  }
}
