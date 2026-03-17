import { articles } from '../data/store.js';

export const getArticles = (req, res) => {
  res.status(200).send('Get articles route');
};

export const createArticle = (req,res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).send('Bad Request');
  }
    
    res.status(201).send('Post articles route');
  };

  export const getArticleById = (req,res) => {
    const article = articles.find(a => a.id === req.params.articleId);
  if (!article) {
    return res.status(404).send('Not Found');
  }

  res.status(200).send(`Get article by Id route: ${req.params.articleId}`);
  };

  export const updateArticle = (req, res) => {
    const article = articles.find(a => a.id === req.params.articleId);

    if(!article) {
      return res.status(404).send('Not Found');
    }

    if(!req.body.title) {
      return res.status(400).send('Bad Request');
    }
    res.status(200).send(`Put article by Id route: ${req.params.articleId}`);
  };

  export const deleteArticle = (req, res) => {
    const article = articles.find(a => a.id === req.params.articleId);

    if (!article) {
      return res.status(404).send('Not Found');
    }

    res.status(204).send();
  };
