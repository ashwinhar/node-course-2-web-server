const express = require('express');
const hbs     = require('hbs');
const fs      = require('fs');

var app       = express();


hbs.registerPartials(__dirname + '/views/partials');         //Creates ability to create partial HTML code blocks
app.set('view engine', 'hbs');


app.use((req, res, next) => {                              //Have to call next to get everything to move on
  var now = new Date().toString();
  var log = `${now}  ${req.method} ${req.url}`;
  console.log(log);

  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append')
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//       pageTitle: 'Maintenance',
//       paragraph: 'Website under construction!'
//   });
// });

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {                //Allows you to create a helper function to do something (return value or quelque chose )
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {                        //Registering a handler for HTTP get request. URL is first parameters (root) so /, then what to send back?
  // res.send('<h1>Hello Express!</h1>');           //This is what's sent
     res.render('home.hbs', {
          pageTitle: 'Home Page',
          paragraph: 'Cells interlinked within cells interlinked'
     });
  });

app.get('/about', (req, res) =>{
  res.render('about.hbs', {
      pageTitle: 'About Page'
  }) ;         //new page

});

app.get('/maintenance', (req, res) =>{
  res.render('maintenance.hbs', {
      pageTitle: 'Maintenance',
      paragraph: 'Website under construction!'
  }) ;         //new page
});

app.get('/bad', (req, res) =>{
    res.send({
      errorMessage: 'Unable to fulfill request.'
    })
});
  app.listen(3000);                    //Binds this to a port
