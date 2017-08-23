var express = require('express');
var morgan = require('morgan');
var path = require('path');

var config = {
    user: 'coco98',
    database: 'coco98',
    host: 'db.imad.hasura-app.io',
    password: process.env.DB_PASSWORD
};

var pool = require('pg').Pool;

var app = express();
app.use(morgan('combined'));

var articles = {
    'article-one': {
        title: 'Article One',
        heading: 'Article One',
        content: 'Hello! Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One Article One'
    },
    'article-two': {
        title: 'Article Two',
        heading: 'Article Two',
        content: `
            <p>
                My second webpage! My second webpage!My second webpage!My second webpage!My second webpage!My second webpage!
                My second webpage! My second webpage!  My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! 
            </p>
            <p>
                My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! 
            </p>
            <p>
                My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! My second webpage! 
            </p>
        `
    }
};

function createTemplate(data) {
    var title = data.title;
    var heading = data.heading;
    var content = data.content;
    
    var html = `
        <html>
            <head>
                <title>${title}</title>
            </head>
            <body>
                <h1>${heading}</h1>
                <p>${content}</p>
            </body>
        </html>
    `;
    
    return html;
}

var pool = new Pool(config);
app.get('/test-db', function(req, res) {
    pool.query('select * from test', function(err, result) {
        if (err) {
            res.status(500).send(err.toString());
        }
        
        
    });
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articleName', function (req, res) {
  var articleName = req.params.articleName; 
  res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
