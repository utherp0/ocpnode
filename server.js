//  OpenShift sample Node application
var express = require('express');
var fs      = require('fs');
var app     = express();
var eps     = require('ejs');

app.engine('html', require('ejs').renderFile);

app.use( '/scripts', express.static('scripts'));
app.use( '/styles', express.static('styles'));

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

// Comment for git testing again
app.get('/', function (req, res)
{
  console.log( "Request received....");
  console.log("Demo time");
  res.render('node_test.html');
});

app.get('/page1.html', function (req,res ) {
  res.render('page1.html');
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
  var output = "";

  output += "<html>";
  output += "  <head>";
  output += "    <link rel='stylesheet' href='styles/ui.css'/>";
  output += "  </head>";
  output += "  <body>";
  output += "    <b>Environment Variables resident on host (generated from node.js)</b><br/>";
  output += "  <hr width=100% size=1/>";

  for( name in process.env )
  {
    output += "<b>" + name + "</b> " + process.env[name] + "<br/>";
  }

  output += JSON.stringify( process.env );
  output += "  </body>";
  output += "</html>";

  res.send( output );
});

app.get( '/env', function (req,res) {
  // Do I have a request variable?
  var input = req.query.name;

  if( input == null )
  {
    res.send( "\"No name parameter provided\"");
  }

  // Do I have an ENV with that name?
  var envoutput = process.env[input];

  if( envoutput == null )
  {
    res.send( "No env variable with name " + input + " found.");
  }
  else
  {
    res.send( input + ":" + envoutput ); 
  }
});

// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

app.listen(port, ip);
console.log('Server running on ' + ip + ':' + port);

function showObject(obj) {
  var result = "";
  for (var p in obj) {
    if( obj.hasOwnProperty(p) ) {
      result += p + " , " + obj[p] + "\n";
    } 
  }              
  return result;
}
