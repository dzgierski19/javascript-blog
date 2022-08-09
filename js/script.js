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

const calculateTagsParams = function (tags) {

  const params = {
    max: 0,
    min: 999999
  };

  for (let tag in tags) {
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }
  return params;
};

const calculateTagClass = function (count, params) {

  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );

  return classNumber;

};

const generateTags = function (){

// create a new variable allTags with an empty object

  let allTags = {};

// find all articles

  const articles = document.querySelectorAll(optArticleSelector);

// START LOOP: for every article:

  for (let article of articles) {

// find tags wrapper

    const articleTagWrapper = article.querySelector(optArticleTagsSelector);

// make html variable with empty string

    let html = '';

// get tags from data-tags attribute

    const articleTags = article.getAttribute('data-tags');

// split tags into array

    const articleTagsArray = articleTags.split(' ');

// START LOOP: for each tag


    for (let tag of articleTagsArray) {

// generate HTML of the link

      const linkHTMLData = {id: tag, title: tag};
      const linkHTML = templates.tagLink(linkHTMLData);

// add generated code to html variable

      html = html + linkHTML;

// check if this link is NOT already in allTags

      if(!allTags.hasOwnProperty(tag)) {

// add generated code to allTags array

        allTags[tag] = 1;

      } else {

        allTags[tag]++;

      }
// END LOOP: for each tag

    }

// insert HTML of all the links into the tags wrapper

    articleTagWrapper.innerHTML = html;

//END LOOP: for every article:
  }

// find list of tags in right column

  const tagList = document.querySelector('.tags');

// create variable for all links HTML code

  const tagsParams = calculateTagsParams(allTags);


  const allTagsData = {tags: []};

// START LOOP: for each tag in allTags

  for (let tag in allTags) {

// generate code of link and add it to allTagsHTML

    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }

// END LOOP: for each tag in allTags
// add html from allTagsHTML to tagList

  tagList.innerHTML = templates.tagCloudLink(allTagsData);
};

generateTags();

const tagClickHandler = function (event) {

// prevent default action for this event

  event.preventDefault();

// make new constant named "clickedElement" and give it the value of "this"

  const clickedElement = this;

// make a new constant "href" and read the attribute "href" of the clicked element

  const href = clickedElement.getAttribute('href');

// make a new constant "tag" and extract tag from the "href" constant

  const tag = href.replace('#tag-', '');

// find all tag links with class active

  const tagActive = document.querySelectorAll('a.active[href^="#tag-"]');

// START LOOP: for each active tag link

  for (let activeTag of tagActive) {

// remove class active

    activeTag.classList.remove('active');

// END LOOP: for each active tag link

  }

// find all tag links with "href" attribute equal to the "href" constant

  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

// START LOOP: for each found tag link

  for (let tagLink of tagLinks) {

// add class active

    tagLink.classList.add('active');

// [DONE] END LOOP: for each found tag link

  }

// execute function "generateTitleLinks" with article selector as argument

  generateTitleLinks('[data-tags~="' + tag + '"]');
  console.log(generateTitleLinks);

};

const addClickListenersToTags = function () {

// find all links to tags

  const allLinksToTags = document.querySelectorAll ('a[href^="#tag-"]');

//START LOOP: for each link

  for (let allLinkToTags of allLinksToTags) {

// add tagClickHandler as event listener for that link

    allLinkToTags.addEventListener('click', tagClickHandler);

//END LOOP: for each link

  }
};

addClickListenersToTags();

addClickListenersToTags();

const calculateAuthorsParams = function (authors) {

  const params = {
    max: 0,
    min: 999999
  };

  for (let author in authors) {
    params.max = Math.max(authors[author], params.max);
    params.min = Math.min(authors[author], params.min);
  }
  return params;
};

const calculateAuthorClass = function (count, params) {

  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return classNumber;

};


const generateAuthors = function (){

// create a new variable allTags with an empty object

  let allAuthors = {};

// find all articles

  const articles = document.querySelectorAll(optArticleSelector);

// START LOOP: for every article:

  for (let article of articles) {

// find tags wrapper

    const articleAuthorWrapper = article.querySelector(optArticleAuthorSelector);

// make html variable with empty string

    let html = '';

// get tags from data-tags attribute

    const articleAuthors = article.getAttribute('data-author');

// generate HTML of the link

    const linkHTMLData = {id: articleAuthors, title: articleAuthors};
    const linkHTML = templates.authorLink(linkHTMLData);

// add generated code to html variable

    html = html + linkHTML;
// check if this link is NOT already in allTags

    if(!allAuthors.hasOwnProperty(articleAuthors)) {

// add generated code to allTags array

      allAuthors[articleAuthors] = 1;

    } else {

      allAuthors[articleAuthors]++;

    }

// insert HTML of all the links into the tags wrapper

    articleAuthorWrapper.innerHTML = html;

// END LOOP: for every article:

  }

// find list of tags in right column

  const authorCloudList = document.querySelector('.authors');

// create variable for all links HTML code

  const authorParams = calculateAuthorsParams(allAuthors);

  let allAuthorsData = {authors: []};

// generate code of link and add it to allTagsHTML
  for (let allAuthor in allAuthors ) {

    allAuthorsData.authors.push({

      author: allAuthor,
      count: allAuthors[allAuthor],
      className: calculateAuthorClass(allAuthors[allAuthor], authorParams)

    });
// END LOOP: for each tag in allTags
  }
// add html from allTagsHTML to tagList

  authorCloudList.innerHTML = templates.authorCloudLink(allAuthorsData);
};

generateAuthors();

const authorClickHandler = function (event) {

// prevent default action for this event

  event.preventDefault();
//make new constant named "clickedElement" and give it the value of "this"

  const clickedElement = this;

// make a new constant "href" and read the attribute "href" of the clicked element

  const href = clickedElement.getAttribute('href');

// make a new constant "tag" and extract tag from the "href" constant

  const author = href.replace('#author-', '');

// find all tag links with class active

  const authorActive = document.querySelectorAll('a.active[href^="#author-"]');

// START LOOP: for each active tag link

  for (let activeAuthor of authorActive) {

// remove class active

    activeAuthor.classList.remove('active');

  }

// find all tag links with "href" attribute equal to the "href" constant

  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

// START LOOP: for each found tag link

  for (let authorLink of authorLinks) {

// add class active

    authorLink.classList.add('active');

// END LOOP: for each found tag link

  }

// execute function "generateTitleLinks" with article selector as argument

  generateTitleLinks('[data-author="' + author + '"]');

};

const addClickListenersToAuthors = function () {

// find all links to tags

  const allLinksToAuthors = document.querySelectorAll ('a[href^="#author"]');


// START LOOP: for each link

  for (let allLinkToAuthors of allLinksToAuthors) {

// add tagClickHandler as event listener for that link

    allLinkToAuthors.addEventListener('click', authorClickHandler);

// END LOOP: for each link

  }
};

addClickListenersToAuthors();

const allPostRefreshArticleList = document.getElementById('all-posts');

allPostRefreshArticleList.addEventListener('click', function() {
  generateTitleLinks();
});
