var express = require('express')
var app = express();
var fs = require('fs');

app.get('/', function (req, res)
{
  fs.readFile('progressguide.html', 'utf8', function(err, data)
  {
      if (err) throw err;
      res.send(data);
      console.log(data);
  });
});

app.listen(process.env.PORT || 3000);
