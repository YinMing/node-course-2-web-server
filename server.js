//config the route, e.g. root of the website
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//work with heroku
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');

//to use template view file
app.set('view engine', 'hbs');
//set up static page web server
//__dirname = Server.MapPath("~/");


app.use((req, res, next)=>
{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n', (err)=>{
      if(err)
        console.log('Unable to append to server.log.');
    });
    //continue the application
    next();

});


// app.use((req, res, next)=>
// {
//   res.render('maintenance.hbs');
// })

app.use(express.static(__dirname + '/public'));

//http://localhost:3000/help.html
hbs.registerHelper('getCurrentYear',()=>
{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>
{
  return text.toUpperCase();
});


//set up HTTP route handler
app.get('/',(req, res)=>
{
  //res.send('<h1>Hello Express!</h1>');
  // res.send({
  //   name: 'Daniel',
  //   likes: [
  //     'Biking',
  //     'Cities'
  //   ]
  // });
  res.render('home.hbs',
  {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  });
});

app.get('/about',(req, res) =>
{
  res.render('about.hbs',
  {
    pageTitle: 'About Page'
  });
});


//bad (for request fail) - send back json with errorMessage
app.get('/bad',(req, res) =>
{
  res.send({
    errorMessage: 'Unable to handle request'
  });

});


app.listen(port, ()=>
{
  console.log(`Server is up on port ${port}`);
});
