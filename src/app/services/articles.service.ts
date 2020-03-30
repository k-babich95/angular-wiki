import { Injectable } from '@angular/core';
import { IArticle } from '../models/entities/IArticle';
import { ArticlesMockService } from './articles-mock.service';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private readonly _articlesKey: string;

  private _articles: IArticle[];

  constructor(
    private articlesMockService: ArticlesMockService
  ) {
    this._articlesKey = "angular-wiki-articles";

    if (!localStorage.getItem(this._articlesKey)) {
      localStorage.setItem(this._articlesKey, JSON.stringify(this.articlesMockService.produce()));
    }

    this._articles = JSON.parse(localStorage.getItem(this._articlesKey));
  }

  public getArticle(id: number): IArticle {
    const articleIndex = this._articles.findIndex(a => a.id == id);
    if (articleIndex < 0) {
      console.error("Article with given id doesn't exist");
      return null;
    }

    return this._articles[articleIndex];
  }

  public getArticles(amount?: number): IArticle[] {
    if (amount < 1 || !amount)
      amount = 100;

    return this._articles.slice(0, amount);
  }

  public createArticle(article: IArticle): IArticle {
    if (article && (!article.title || !article.firstParagraph)) {
      console.error("Article must have title and first paragraph");
      return null;
    }

    article.id = this.generateIdForArticle();

    this._articles.push(article);
    localStorage.setItem(this._articlesKey, JSON.stringify(this._articles));
    return article;
  }

  public updateArticle(article: IArticle): IArticle {
    if (article && !article.id) {
      console.error("Article must have id");
      return null;
    }

    const articleIndex = this._articles.findIndex(a => a.id == article.id);
    if (articleIndex < 0) {
      console.error("Article with given id doesn't exist");
    }

    let existingArticle = this._articles[articleIndex];
    for (let key in article) {
      existingArticle[key] = article[key];
    }

    this._articles[articleIndex] = existingArticle;
    localStorage.setItem(this._articlesKey, JSON.stringify(this._articles));
  }

  public deleteArticle(id: number): void {
    const articleIndex = this._articles.findIndex(a => a.id == id);
    if (articleIndex < 0) {
      console.error("Article with given id doesn't exist");
      return null;
    }

    this._articles.splice(articleIndex, 1);
    localStorage.setItem(this._articlesKey, JSON.stringify(this._articles));
  }

  public getArticleCopy(article: IArticle): IArticle {
    return {
      id: article.id,
      body: article.body,
      firstParagraph: article.firstParagraph,
      imageUrl: article.imageUrl,
      title: article.title
    };
  }

  private generateIdForArticle(): number {
    let currentId = Math.max(...this._articles.map(x => x.id));
    return ++currentId;
  }
}