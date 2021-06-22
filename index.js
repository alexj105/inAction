const express = require("express");
const bodyparser = require("body-parser");
const { urlencoded } = require("body-parser");
const { Article } = require("./db");
const port = process.env.port || 3000;

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

let articles = [{ title: "title1" }];

app.get("/", (req, res) => {
  Article.all((err,articles)=>{
    if(err) return next(err)
    res.send(articles)
  })
});

app.get("/articles", (req, res, next) => {
  Article.all((err,articles)=>{
    if(err) return next(err)
    res.send(articles)
  })
});

app.post("/articles", (req, res, next) => {

  const url =  req.body.url;


  const article = { title: req.body.title };
  articles.push(article);
  res.send(article);
});

app.get("/articles/:id", (req, res, next) => {
  const id = req.params.id;
  Article.find(id,(err,article)=>{
    if(err) return next(err)
    res.send(article)
  })
});

app.delete("/articles:id", (req, res, next) => {
 Article.delete(id,(err)=>{
   if(err) return next(err)
   res.send({message:'Deleted'})
 })
});

app.listen(port, () => {
  console.log(`server was running on  ${port}`);
});

module.exports = app