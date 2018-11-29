var express = require('express')
var app = express();
var fs = require('fs');

var bodyParser = require('body-parser');
// URL-encoded bodies
app.use(bodyParser.urlencoded({extended: true}));

// DDOS protection from https://www.npmjs.com/package/ddos
var Ddos = require('ddos');
if (app.get('env') !== 'development')
{
  var ddos = new Ddos({burst:10, limit:15});
  app.use(ddos.express);
}

app.get('/', function (req, res)
{
  fs.readFile('public/progressguide.html', 'utf8', function(err, data)
  {
      if (err) throw err;
      res.send(data);
  });
});

app.post('/make-progress', function (req, res)
{
  console.log(req.body);
  res.send('I hear you.');
});

// Access all .js files
app.use(express.static('public'));

app.listen(process.env.PORT || 3000);
