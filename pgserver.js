var express = require('express')
var app = express();
var fs = require('fs');
var nedb = require('nedb'); // https://github.com/louischatriot/nedb
var db = new nedb();
var handlebars = require('handlebars'); // https://handlebarsjs.com/

var bodyParser = require('body-parser');
// URL-encoded bodies
app.use(bodyParser.urlencoded({extended: true}));

for (var databaseFilename of fs.readdirSync('categories'))
{
  // Load database file as string
  var databaseFile = fs.readFileSync('categories/' + databaseFilename);
  // Parse database file
  var databaseJSON = JSON.parse(databaseFile);

  db.insert(databaseJSON, function (err, dbEntries)
  {
    // The dbEntries parameter is an array containing these entries, augmented with their _id.
  });
}

function arrayify(postdata)
{
  if (Array.isArray(postdata))
  {
    return postdata;
  }
  else if (postdata === undefined)
  {
    return [];
  }
  else
  {
    return [postdata];
  }
}

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
  //console.log(arrayify(req.body));

  fs.readFile('public/progressaction.html', 'utf8', function(err, source)
  {
    if (err) throw err;

    db.find({level: {$in: arrayify(req.body.level)}}, function (err, entries)
    {
      // The entries parameter is an array containing matching entries.
      // If no entry is found, entries is equal to [].
      var template = handlebars.compile(source);
      var html = template({entries: entries});

      res.send(html);
    });
  });
});

// Access all .js files
app.use(express.static('public'));

app.listen(process.env.PORT || 3000);
