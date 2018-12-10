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

    var contributionValue = parseInt(req.body.contribution);
    var contributionFilter;
    if (contributionValue <= 33)
    {
      contributionFilter = [{time: 'true'}];
    }
    else if (contributionValue >= 66)
    {
      contributionFilter = [{money: 'true'}];
    }
    else
    {
      contributionFilter = [{time: 'true'}, {money: 'true'}];
    }

    db.find(
    {
      $or: [
        {
          identity: {$in: req.body.lgbtq == 'yes' ? ['lgbtq'] : []}
        },
        {
          $or: contributionFilter,
          type: {$in: arrayify(req.body.type)},
          level: {$in: arrayify(req.body.level)},
          cause: {$in: arrayify(req.body.cause)}
        }
      ]
    }, function (err, entries)
      {
        // The entries parameter is an array containing matching entries.
        // If no entry is found, entries is equal to [].

        entries.sort(function(a, b)
        {
          var x = a.name.toLowerCase();
          var y = b.name.toLowerCase();
          if (x < y) {return -1;}
          if (x > y) {return 1;}
          return 0;
        });

        var template = handlebars.compile(source);

        var handlebarsParams = {entries: entries};

        if (parseInt(req.body.age) < 16)
        {
          handlebarsParams.ineligible = true;
        }
        else if (parseInt(req.body.age) < 18)
        {
          handlebarsParams["prereg" + req.body.prereg] = true;
        }
        else
        {
          handlebarsParams[req.body.voterstatus] = true;
        }

        if (req.body.party == 'republican')
        {
          handlebarsParams.republican = true;
        }
        else if (req.body.party == 'libertarian')
        {
          handlebarsParams.libertarian = true;
        }
        else if (req.body.party == 'americanIndependent')
        {
          handlebarsParams.americanIndependent = true;
        }
        else
        {
          handlebarsParams.showRegistrationInfo = true;
        }

        var html = template(handlebarsParams);


        res.send(html);
      }
    );
  });
});

// Access all .js files
app.use(express.static('public'));

app.listen(process.env.PORT || 3000);
