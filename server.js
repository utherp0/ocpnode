//  OpenShift sample Node application
var express = require('express');
var fs      = require('fs');
var app     = express();
var eps     = require('ejs');
var petitions = require('./petitionhandle');

app.engine('html', require('ejs').renderFile);

app.use( '/scripts', express.static('scripts'));
app.use( '/styles', express.static('styles'));

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

// Comment for git testing
app.get('/', function (req, res)
{
  res.render('node_test.html');
});

app.get('/page1.html', function (req,res ) {
  res.render('page1.html');
});

app.get('/petition', function (req,res) {
  var data = petitions.loadData(req.query.id);

  res.send('<html><head><title>UthTest2 Headers Output</title></head><body>'
    + '<b>PETITION ' + req.query.id + ' responded:</b><br/>'
    + data
    + '</body></html>');
});

app.get('/page2.html', function (req,res) {
  res.send('<html><head><title>UthTest2 Headers Output</title></head><body>'
    + '<plaintext>'
    + JSON.stringify(res.headers)
    + '</plaintext>'
    + '</body></html>');
});

app.get('/page3.html', function (req,res) {
  var output = "";

  output += "<html>";
  output += "  <head>";
  output += "    <link rel='stylesheet' href='styles/ui.css'/>";
  output += "  </head>";
  output += "  <body>";
  output += "    <b>Third Test Page (generated from node.js)</b><br/>";
  output += "  <hr width=100% size=1/>";
  output += JSON.stringify( process.env );
  output += "  </body>";
  output += "</html>";

  res.send( output );
});

app.get('/page4.html', function (req,res) {
  var envkeys = _.keys(process.env);

  res.send( 'Keys:' + envkeys );
});

// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

app.listen(port, ip);
console.log('Server running on ' + ip + ':' + port);
