var express = require('express')
var app = express();
var fs = require('fs');

app.get('/', function (req, res)
{
  fs.readFile('public/progressguide.html', 'utf8', function(err, data)
  {
      if (err) throw err;
      res.send(data);
  });
});

// Access all .js files
app.use(express.static('public'));

app.listen(process.env.PORT || 3000);
