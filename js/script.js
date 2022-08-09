'use strict';

const templates = {

    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),
  };
  
const titleClickHandler = function(event) {
  
event.preventDefault();
  
const clickedElement = this;
// remove class 'active' from all article links  
  
const activeLinks = document.querySelectorAll('.titles a.active');
  
for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
}

// add class 'active' to the clicked link 
  
clickedElement.classList.add('active');
  
// remove class 'active' from all articles 
  
const activeArticles = document.querySelectorAll('.posts article.post.active');
  
for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
}

// get 'href' attribute from the clicked link 
  
const articleSelector = clickedElement.getAttribute('href');
  
// find the correct article using the selector (value of 'href' attribute) 
  
const targetArticle = document.querySelector(articleSelector);
  
// add class 'active' to the correct article 
  
targetArticle.classList.add('active');
  
};
  
const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';
const optArticleAuthorSelector = '.post-author';
const optCloudClassCount  = 5;
  
const generateTitleLinks = function(customSelector = '') {
  
// remove contents of titleList 
  
const titleList = document.querySelector(optTitleListSelector);
titleList.innerHTML = '';
  
// for each article 
  
const articles = document.querySelectorAll(optArticleSelector + customSelector);
let html = '';
  
for (let article of articles) {
  
// get the article id 
  
const articleId = article.getAttribute('id');
  
// find the title element 
// get the title from the title element 
  
const articleTitle = article.querySelector(optTitleSelector).innerHTML;
  
// create HTML of the link
  
const linkHTMLData = {id: articleId, title: articleTitle};
const linkHTML = templates.articleLink(linkHTMLData);
  
// insert link into titleList 
  
    html = html + linkHTML;
}
  
titleList.innerHTML = html;
const links = document.querySelectorAll('.titles a');
  
for (let link of links) {
    link.addEventListener('click', titleClickHandler);
    }
};
  
generateTitleLinks();