import { outputAst } from '@angular/compiler';
import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ArticleModel } from 'src/app/models/article.model';

@Component({
  selector: 'app-articles-form',
  templateUrl: './articles-form.component.html',
  styleUrls: ['./articles-form.component.scss']
})
export class ArticlesFormComponent implements OnInit, OnChanges {

  @Input() articleList : ArticleModel[];
  @Input() addArticleForm : ArticleModel;
  @Output() editArticleFormEmitter = new EventEmitter<number>();
  @Output() cancelEditingFormEmitter = new EventEmitter<number>();
  @Output() showAbstractFormEmitter = new EventEmitter<number>();
  @Output() deleteArticleFormEmitter = new EventEmitter<number>();

  articleForm: FormGroup;

  constructor(private fb: FormBuilder ) { 
    this.articleList = [];
    this.addArticleForm = {
      id: 0,
      title: '',
      journal: '',
      abstract: '',
      isEditing: false,
      isShowingAbstract: false,
    }
    this.articleForm = this.fb.group({
      articles: this.fb.array([])
    });
  }

  get getArticleList () {
    return (this.articleForm.get('articles') as FormArray);
  }

  addArticle(articleData: ArticleModel){
    return this.fb.group({
      title: [articleData.title],
      journal: [articleData.journal],
      abstract: [articleData.abstract],
    })
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['articleList'].currentValue){
      this.articleList.forEach(element => {
        console.log('element', element);
        this.getArticleList.push(this.addArticle(element))
      } )
    }

    // if(changes['addArticleForm'].currentValue){

    // }


  }

  getImageSource(index: number){
    return this.articleList[index].journal.toLowerCase().includes('plos one') ? 'assets/img/plos.png' : 'assets/img/not_found.png'
  }

  editArticleForm(i: number){
    this.editArticleFormEmitter.emit(i);
  }

  cancelEditForm(i: number){
    this.cancelEditingFormEmitter.emit(i);
  }

  showAbstract(i: number){
    this.showAbstractFormEmitter.emit(i);
  }

  deleteArticleForm(i: number){
    this.deleteArticleFormEmitter.emit(i);
    this.getArticleList.removeAt(i); 
  }
  
}
