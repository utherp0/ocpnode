var https = require( 'https');
var promise = require('request-promise');

module.exports =
{
  getData: function getData( petition )
  {
    return await loadData( petition );
  },

  loadData: function loadData( petition )
  {
    var body = "";

    console.log( petition );

    var target = "https://petition.parliament.uk/petitions/" + petition + ".json";
    console.log( target );

    // Format - https://petition.parliament.uk/petitions/241584.json
    var request = https.get(target, function(response)
    {  
      response.setEncoding('utf8');
      response.on("data", function(chunk)
      { 
//        console.log( chunk );
//        console.log( body.length);
        body = body + chunk; 
      }); 
    });

    console.log( "End length " + body.length);
    console.log( JSON.parse(body) );
    console.log( body );

    return promise(body);
  }
} 