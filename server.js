const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log(err);
    };
  });
  next();
});

app.use((req, res, next) => {
  res.render('maintenance.hbs');
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'My Home Page',
    currentYear: new Date().getFullYear(),
    welcomeMessage: 'Welcome to my home page now'
  });
});

app.get('/about', (req, res) => {
  res.send('About Page!!');
});

app.get('/help', (req, res) => {
  res.render('help.hbs', {
    pageTitle: 'My Help Page',
    currentYear: new Date().getFullYear()
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
