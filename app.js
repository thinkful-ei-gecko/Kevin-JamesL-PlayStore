const express = require('express');
const morgan = require('morgan');

const app = express();

const playStore = require ('./playstore.js');

app.get('/apps', (req, res) => {
  const { sort, genres } = req.query;
  let results = playStore
  if(sort){
    if(!['Rating', 'App'].includes(sort)){
      return res.status(400).send('Sort must include rating or app values')
    }
  }
  if(genres){
    results=playStore.filter(playApp => {
    return playApp.Genres.toLowerCase().includes(genres.toLowerCase())
    })
  }
  if(sort){
    results.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0
    })
  }
  return res.json(results)

});

app.listen(8000, () => {
  console.log('Server running on 8000')
})