'use strict';

var templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
};

var titleClickHandler = function titleClickHandler(event) {
  event.preventDefault();
  var clickedElement = this;
  /* [DONE] remove class 'active' from all article links  */

  var activeLinks = document.querySelectorAll('.titles a.active');
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = activeLinks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var activeLink = _step.value;
      activeLink.classList.remove('active');
    }
    /* [DONE] add class 'active' to the clicked link */

  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  clickedElement.classList.add('active');
  /* [DONE] remove class 'active' from all articles */

  var activeArticles = document.querySelectorAll('.posts article.post.active');
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = activeArticles[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var activeArticle = _step2.value;
      activeArticle.classList.remove('active');
    }
    /* [DONE] get 'href' attribute from the clicked link */

  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  var articleSelector = clickedElement.getAttribute('href');
  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  var targetArticle = document.querySelector(articleSelector);
  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active');
};

var optArticleSelector = '.post';
var optTitleSelector = '.post-title';
var optTitleListSelector = '.titles';
var optArticleTagsSelector = '.post-tags .list';
var optArticleAuthorSelector = '.post-author';
var optCloudClassCount = 5;

var generateTitleLinks = function generateTitleLinks() {
  var customSelector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  /* remove contents of titleList */
  var titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  /* for each article */

  var articles = document.querySelectorAll(optArticleSelector + customSelector);
  var html = '';
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = articles[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var article = _step3.value;

      /* [DONE] get the article id */
      var articleId = article.getAttribute('id');
      /* [DONE] find the title element */

      /* [DONE] get the title from the title element */

      var articleTitle = article.querySelector(optTitleSelector).innerHTML;
      /* [DONE] create HTML of the link */

      var linkHTMLData = {
        id: articleId,
        title: articleTitle
      };
      var linkHTML = templates.articleLink(linkHTMLData);
      /* [DONE] insert link into titleList */

      html = html + linkHTML;
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
        _iterator3["return"]();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  titleList.innerHTML = html;
  var links = document.querySelectorAll('.titles a');
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = links[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var link = _step4.value;
      link.addEventListener('click', titleClickHandler);
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
        _iterator4["return"]();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }
};

generateTitleLinks();

var calculateTagsParams = function calculateTagsParams(tags) {
  var params = {
    max: 0,
    min: 999999
  };

  for (var tag in tags) {
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }

  return params;
};

var calculateTagClass = function calculateTagClass(count, params) {
  var normalizedCount = count - params.min;
  var normalizedMax = params.max - params.min;
  var percentage = normalizedCount / normalizedMax;
  var classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return classNumber;
};

var generateTags = function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  var allTags = {};
  /* [DONE] find all articles */

  var articles = document.querySelectorAll(optArticleSelector);
  /* [DONE] START LOOP: for every article: */

  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = articles[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var article = _step5.value;

      /* [DONE] find tags wrapper */
      var articleTagWrapper = article.querySelector(optArticleTagsSelector);
      /* [DONE] make html variable with empty string */

      var html = '';
      /* [DONE] get tags from data-tags attribute */

      var articleTags = article.getAttribute('data-tags');
      /* [DONE] split tags into array */

      var articleTagsArray = articleTags.split(' ');
      /* [DONE] START LOOP: for each tag */

      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = articleTagsArray[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var _tag = _step6.value;

          /* [DONE] generate HTML of the link */
          var linkHTMLData = {
            id: _tag,
            title: _tag
          };
          var linkHTML = templates.tagLink(linkHTMLData);
          /* [DONE] add generated code to html variable */

          html = html + linkHTML;
          /* [NEW] check if this link is NOT already in allTags */

          if (!allTags.hasOwnProperty(_tag)) {
            /* [NEW] add generated code to allTags array */
            allTags[_tag] = 1;
          } else {
            allTags[_tag]++;
          }
          /* [DONE] END LOOP: for each tag */

        }
        /* insert HTML of all the links into the tags wrapper */

      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
            _iterator6["return"]();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }

      articleTagWrapper.innerHTML = html;
      /* [DONE] END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */

  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
        _iterator5["return"]();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }

  var tagList = document.querySelector('.tags');
  /* [NEW] create variable for all links HTML code*/

  var tagsParams = calculateTagsParams(allTags);
  var allTagsData = {
    tags: []
  };
  /* [NEW] START LOOP: for each tag in allTags :*/

  for (var tag in allTags) {
    /* [NEW] generate code of link and add it to allTagsHTML*/
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }
  /* [NEW] END LOOP: for each tag in allTags */

  /* [NEW] add html from allTagsHTML to tagList */


  tagList.innerHTML = templates.tagCloudLink(allTagsData);
};

generateTags();

var tagClickHandler = function tagClickHandler(event) {
  /* [DONE] prevent default action for this event */
  event.preventDefault();
  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */

  var clickedElement = this;
  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */

  var href = clickedElement.getAttribute('href');
  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */

  var tag = href.replace('#tag-', '');
  /* [DONE] find all tag links with class active */

  var tagActive = document.querySelectorAll('a.active[href^="#tag-"]');
  /* [DONE] START LOOP: for each active tag link */

  var _iteratorNormalCompletion7 = true;
  var _didIteratorError7 = false;
  var _iteratorError7 = undefined;

  try {
    for (var _iterator7 = tagActive[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
      var activeTag = _step7.value;

      /* [DONE] remove class active */
      activeTag.classList.remove('active');
      /* [DONE] END LOOP: for each active tag link */
    }
    /* [DONE] find all tag links with "href" attribute equal to the "href" constant */

  } catch (err) {
    _didIteratorError7 = true;
    _iteratorError7 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
        _iterator7["return"]();
      }
    } finally {
      if (_didIteratorError7) {
        throw _iteratorError7;
      }
    }
  }

  var tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* [DONE] START LOOP: for each found tag link */

  var _iteratorNormalCompletion8 = true;
  var _didIteratorError8 = false;
  var _iteratorError8 = undefined;

  try {
    for (var _iterator8 = tagLinks[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
      var tagLink = _step8.value;

      /*[DONE]  add class active */
      tagLink.classList.add('active');
      /* [DONE] END LOOP: for each found tag link */
    }
    /* [DONE] execute function "generateTitleLinks" with article selector as argument */

  } catch (err) {
    _didIteratorError8 = true;
    _iteratorError8 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
        _iterator8["return"]();
      }
    } finally {
      if (_didIteratorError8) {
        throw _iteratorError8;
      }
    }
  }

  generateTitleLinks('[data-tags~="' + tag + '"]');
  console.log(generateTitleLinks);
};

var addClickListenersToTags = function addClickListenersToTags() {
  /* find all links to tags */
  var allLinksToTags = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */

  var _iteratorNormalCompletion9 = true;
  var _didIteratorError9 = false;
  var _iteratorError9 = undefined;

  try {
    for (var _iterator9 = allLinksToTags[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
      var allLinkToTags = _step9.value;

      /* add tagClickHandler as event listener for that link */
      allLinkToTags.addEventListener('click', tagClickHandler);
      /* END LOOP: for each link */
    }
  } catch (err) {
    _didIteratorError9 = true;
    _iteratorError9 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion9 && _iterator9["return"] != null) {
        _iterator9["return"]();
      }
    } finally {
      if (_didIteratorError9) {
        throw _iteratorError9;
      }
    }
  }
};

addClickListenersToTags();

var calculateAuthorsParams = function calculateAuthorsParams(authors) {
  var params = {
    max: 0,
    min: 999999
  };

  for (var author in authors) {
    params.max = Math.max(authors[author], params.max);
    params.min = Math.min(authors[author], params.min);
  }

  return params;
};

var calculateAuthorClass = function calculateAuthorClass(count, params) {
  var normalizedCount = count - params.min;
  var normalizedMax = params.max - params.min;
  var percentage = normalizedCount / normalizedMax;
  var classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return classNumber;
};

var generateAuthors = function generateAuthors() {
  /* [NEW] create a new variable allTags with an empty object */
  var allAuthors = {};
  /* [DONE] find all articles */

  var articles = document.querySelectorAll(optArticleSelector);
  /* [DONE] START LOOP: for every article: */

  var _iteratorNormalCompletion10 = true;
  var _didIteratorError10 = false;
  var _iteratorError10 = undefined;

  try {
    for (var _iterator10 = articles[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
      var article = _step10.value;

      /* [DONE] find tags wrapper */
      var articleAuthorWrapper = article.querySelector(optArticleAuthorSelector);
      /* [DONE] make html variable with empty string */

      var html = '';
      /* [DONE] get tags from data-tags attribute */

      var articleAuthors = article.getAttribute('data-author');
      /* [DONE] generate HTML of the link */

      var linkHTMLData = {
        id: articleAuthors,
        title: articleAuthors
      };
      var linkHTML = templates.authorLink(linkHTMLData);
      /* [DONE] add generated code to html variable */

      html = html + linkHTML;
      /* [NEW] check if this link is NOT already in allTags */

      if (!allAuthors.hasOwnProperty(articleAuthors)) {
        /* [NEW] add generated code to allTags array */
        allAuthors[articleAuthors] = 1;
      } else {
        allAuthors[articleAuthors]++;
      }
      /* insert HTML of all the links into the tags wrapper */


      articleAuthorWrapper.innerHTML = html;
      /* [DONE] END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */

  } catch (err) {
    _didIteratorError10 = true;
    _iteratorError10 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion10 && _iterator10["return"] != null) {
        _iterator10["return"]();
      }
    } finally {
      if (_didIteratorError10) {
        throw _iteratorError10;
      }
    }
  }

  var authorCloudList = document.querySelector('.authors');
  /* [NEW] create variable for all links HTML code*/

  var authorParams = calculateAuthorsParams(allAuthors);
  var allAuthorsData = {
    authors: []
  };
  /* [NEW] generate code of link and add it to allTagsHTML*/

  for (var allAuthor in allAuthors) {
    allAuthorsData.authors.push({
      author: allAuthor,
      count: allAuthors[allAuthor],
      className: calculateAuthorClass(allAuthors[allAuthor], authorParams)
    });
    /* [NEW] END LOOP: for each tag in allTags */
  }
  /* [NEW] add html from allTagsHTML to tagList */


  authorCloudList.innerHTML = templates.authorCloudLink(allAuthorsData);
};

generateAuthors();

var authorClickHandler = function authorClickHandler(event) {
  /* [DONE] prevent default action for this event */
  event.preventDefault();
  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */

  var clickedElement = this;
  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */

  var href = clickedElement.getAttribute('href');
  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */

  var author = href.replace('#author-', '');
  /* [DONE] find all tag links with class active */

  var authorActive = document.querySelectorAll('a.active[href^="#author-"]');
  /* [DONE] START LOOP: for each active tag link */

  var _iteratorNormalCompletion11 = true;
  var _didIteratorError11 = false;
  var _iteratorError11 = undefined;

  try {
    for (var _iterator11 = authorActive[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
      var activeAuthor = _step11.value;

      /* [DONE] remove class active */
      activeAuthor.classList.remove('active');
    }
    /* [DONE] find all tag links with "href" attribute equal to the "href" constant */

  } catch (err) {
    _didIteratorError11 = true;
    _iteratorError11 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion11 && _iterator11["return"] != null) {
        _iterator11["return"]();
      }
    } finally {
      if (_didIteratorError11) {
        throw _iteratorError11;
      }
    }
  }

  var authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* [DONE] START LOOP: for each found tag link */

  var _iteratorNormalCompletion12 = true;
  var _didIteratorError12 = false;
  var _iteratorError12 = undefined;

  try {
    for (var _iterator12 = authorLinks[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
      var authorLink = _step12.value;

      /*[DONE]  add class active */
      authorLink.classList.add('active');
      /* [DONE] END LOOP: for each found tag link */
    }
    /* [DONE] execute function "generateTitleLinks" with article selector as argument */

  } catch (err) {
    _didIteratorError12 = true;
    _iteratorError12 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion12 && _iterator12["return"] != null) {
        _iterator12["return"]();
      }
    } finally {
      if (_didIteratorError12) {
        throw _iteratorError12;
      }
    }
  }

  generateTitleLinks('[data-author="' + author + '"]');
};

var addClickListenersToAuthors = function addClickListenersToAuthors() {
  /* find all links to tags */
  var allLinksToAuthors = document.querySelectorAll('a[href^="#author"]');
  /* START LOOP: for each link */

  var _iteratorNormalCompletion13 = true;
  var _didIteratorError13 = false;
  var _iteratorError13 = undefined;

  try {
    for (var _iterator13 = allLinksToAuthors[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
      var allLinkToAuthors = _step13.value;

      /* add tagClickHandler as event listener for that link */
      allLinkToAuthors.addEventListener('click', authorClickHandler);
      /* END LOOP: for each link */
    }
  } catch (err) {
    _didIteratorError13 = true;
    _iteratorError13 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion13 && _iterator13["return"] != null) {
        _iterator13["return"]();
      }
    } finally {
      if (_didIteratorError13) {
        throw _iteratorError13;
      }
    }
  }
};

addClickListenersToAuthors();
var allPostRefreshArticleList = document.getElementById('all-posts');
allPostRefreshArticleList.addEventListener('click', function () {
  generateTitleLinks();
});
//# sourceMappingURL=script.dev.js.map
