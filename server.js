// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date_string?", (req, res) => {
  const { date_string } = req.params;
  const date = date_string ? new Date(date_string) : new Date();
  const unix = date.getTime();
  if (isNaN(unix)) {
    // Try as an unix date
    const unixInput = parseInt(Number(date_string))
    if (isNaN(unixInput)) {
      return res.status(200).send({ error: date.toString() })
    } else {
      return res.status(200).send({
        unix: unixInput,
        utc: new Date(unixInput).toUTCString(),
      })
    }
  }
  res.status(200).send({
    unix,
    utc: date.toUTCString(),
  });
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});