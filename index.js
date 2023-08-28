import rss from 'rss';
import puppeteer from 'puppeteer';
import fetch from 'node-fetch';
import queryString from 'query-string';

(async () => {
  const baseApiUrl = 'https://apii.mittrchina.com/information/index';
  const query = queryString.stringify({
    'limit': 50,
  });

  const fullApi = `${baseApiUrl}?${query}`;
  const articles = await _fetchArticleList(fullApi);
  console.log(articles);
  //const fullContents = await _fetchFullContent(articles);
})();

async function _fetchArticleList(apiUrl){
  const response = await fetch(apiUrl);
  const data = await response.json();
  const dataItems = data['data']['items'];
  const articles = [];
  for(let i = 0; i < dataItems.length; i++){
    const item = dataItems[i];
    const article = {
      'title': item.name,
      'summary': item.summary,
      'cover': item.cover,
      'authors': item.authors[0]['username'],
      'url': `https://www.mittrchina.com/news/detail/${item.id}`,
    };
    articles.push(article);
  }
  return articles;
}

async function _fetchFullContent(articles){
  let fullArticles = [];
  for(let i = 0; i < articles.length; i++){
    const article = articles[i];
    const targetUrl = article['url'];
    if(i = 0){
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      console.log(targetUrl);
      /*
      await page.goto(targetUrl);
      await page.screenshot({
        path: 'screenshot.jpg'
      });
      /*
      const newListContent = await page.evaluate(() => {
        return document.querySelector('.content').innerHTML;
      });
      */
      await browser.close();
    }
  }
}
