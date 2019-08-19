import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles.service';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';

import { IArticle } from 'src/app/models/entities/IArticle';
import { UpdateArticleComponent } from '../modals/update-article/update-article.component';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit {
  public article: IArticle;
  public isNewArticle: boolean;

  constructor(
    public matDialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _articlesService: ArticlesService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    if (this._route.routeConfig.path === "articles/new") {
      this.isNewArticle = true;
      this.article = {
        id: -1,
        body: "",
        firstParagraph: "",
        imageUrl: "",
        title: ""
      };
    }
    else {
      if (this._route.snapshot.params && this._route.snapshot.params.id) {
        const id = this._route.snapshot.params.id;

        let article = this._articlesService.getArticle(id);
        //Create a copy to ensure that changes will be save only after press "Save" button (avoid probles with two-way binding)
        this.article = this._articlesService.getArticleCopy(article);
      }
      else {
        this._router.navigate(['/not-found']);
        return;
      }
    }
  }

  ngOnInit() {
  }

  public saveArticle(): void {
    if (!this.article.firstParagraph || !this.article.title)
    {
      const errorMessage = "Article must have a title and first paragraph";
      console.error(errorMessage);
      this._snackBar.open(errorMessage, "Close", {
        duration: 5000
      });
      return;
    }

    if (this.isNewArticle) {
      this.article = this._articlesService.createArticle(this.article);
      if (this.article.id > -1)
        this._router.navigate([`/article/${this.article.id}`]);
      else
        console.error('Could not create new article');
    }
    else {
      let dialogRef = this.matDialog.open(UpdateArticleComponent, {
        height: '160px',
        width: '340px'
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this._articlesService.updateArticle(this.article);
          this._router.navigate([`/article/${this.article.id}`]);
        }
      });
    }
  }

  public undoArticle(): void {
    if (this.isNewArticle) {
      this._router.navigate(['']);
    }
    else {
      this._router.navigate([`/article/${this.article.id}`]);
    }
  }
}
