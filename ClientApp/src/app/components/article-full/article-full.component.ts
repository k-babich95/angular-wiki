import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IArticle } from 'src/app/models/entities/IArticle';

import { MatDialog, MatDialogRef } from '@angular/material';
import { DeleteArticleComponent } from '../modals/delete-article/delete-article.component';
import { Article } from 'src/app/models/entities/Article';

@Component({
   selector: 'app-article-full',
   templateUrl: './article-full.component.html',
   styleUrls: ['./article-full.component.css']
})
export class ArticleFullComponent implements OnInit {
   public article: Article;

   constructor(
      public matDialog: MatDialog,
      private _articlesService: ArticlesService,
      private _route: ActivatedRoute,
      private _router: Router
   ) {
      if (this._route.snapshot.params && this._route.snapshot.params.id) {
         const id = this._route.snapshot.params.id;

         this._articlesService.getArticle(id)
            .subscribe(response => {
               if (!response.isSuccess || !response.item)
                  this._router.navigate(['/not-found']);

               this.article = new Article(response.item);
               console.log(this.article.getTagsString());
            });
      }
      else {
         this._router.navigate(['/not-found']);
      }
   }

   ngOnInit() {
   }

   public editArticle(): void {
      this._router.navigate([`/article/${this.article.id}/edit`]);
   }

   public deleteArticle(): void {
      let dialogRef = this.matDialog.open(DeleteArticleComponent, {
         height: '160px',
         width: '340px'
      });

      dialogRef.afterClosed().subscribe(result => {
         if (result) {
            this._articlesService.deleteArticle(this.article.id)
               .subscribe(response => {
                  response.isSuccess && this._router.navigate([""]);
               });
         }
      });
   }
}
