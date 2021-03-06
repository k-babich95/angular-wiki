﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AngularWiki.API.Models.Entities.Database;
using AngularWiki.API.Models.Responses;
using AngularWiki.API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace AngularWiki.API.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        protected readonly AngularWikiDbContext DbContext;

        public ArticleController(AngularWikiDbContext dbContext)
        {
            DbContext = dbContext;
        }

        [HttpGet("Articles")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> GetArticles()
        {
            ListResponse<Article> response = new ListResponse<Article>();

            try
            {
                response.Items = await DbContext.Articles.ToListAsync();
                response.IsSuccess = true;
            }
            catch (Exception e)
            {
                System.Diagnostics.Trace.TraceError(e.Message);

                response.IsSuccess = false;
                response.Message = e.Message;
            }

            return response.ToHttpResponse();
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> GetArticle(long id)
        {
            SingleResponse<Article> response = new SingleResponse<Article>();

            try
            {
                response.Item = await DbContext.Articles.FirstOrDefaultAsync(a => a.Id == id);
                response.IsSuccess = true;
            }
            catch (Exception e)
            {
                System.Diagnostics.Trace.TraceError(e.Message);

                response.IsSuccess = false;
                response.Message = e.Message;
            }

            return response.ToHttpResponse();
        }

        [HttpPost]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> PostArticle(Article postArticle)
        {
            ISingleResponse<Article> response = new SingleResponse<Article>();

            try
            {
                response = await new ArticleService(DbContext)
                    .CreateArticle(postArticle);
            }
            catch (Exception e)
            {
                System.Diagnostics.Trace.TraceError(e.Message);

                response.IsSuccess = false;
                response.Message = e.Message;
            }

            return response.ToHttpResponse();
        }

        [HttpPatch("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> PatchArticle(Article patchArticle)
        {
            ISingleResponse<Article> response = new SingleResponse<Article>();

            try
            {
                response = await new ArticleService(DbContext)
                    .PatchArticle(patchArticle);
            }
            catch (Exception e)
            {
                System.Diagnostics.Trace.TraceError(e.Message);

                response.IsSuccess = false;
                response.Message = e.Message;
            }

            return response.ToHttpResponse();
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> DeleteArticle(long id)
        {
            IResponse response = new Response();

            try
            {
                response = await new ArticleService(DbContext)
                    .DeleteArticle(id);
            }
            catch (Exception e)
            {
                System.Diagnostics.Trace.TraceError(e.Message);

                response.IsSuccess = false;
                response.Message = e.Message;
            }

            return response.ToHttpResponse();
        }
    }
}