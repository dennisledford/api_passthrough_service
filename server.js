var express = require('express');
var http = require("http");
var app = express();
var querystring = require("querystring");
//add Headers
var setHeaders = function (res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
};



app.get('/api/:url/:path', function(req, res) {
  console.log(req.params.url);
  console.log(req.params.path);
  var output='';
  var url=req.params.url;
  var options = {
    host: url,//req.params.url,
    port: 80,
    path: req.params.path,
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
  };
  setHeaders(res);
  http.request(options, function(jira_res) {
    console.log('STATUS: ' + jira_res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(jira_res.headers));
    jira_res.setEncoding('utf8');
    jira_res.on('data', function (chunk) {
    output += chunk;
    });
    jira_res.on('end', function(){
    var obj = JSON.parse(output);
    res.send(jira_res.statusCode, obj);
    });
  }).end();
});


app.get('/jira/:path', function(req, res) {
	var output='';
	var url="url"
	var auth="username:password";
  var auth64 = new Buffer(auth).toString('base64');
	var authHeader = 'Basic ' + auth64;
  var path = req.params.path.split('?')[0];
  var pArray =  req.params.path.split('?')[1].split("&");
  var params='';
  for(i=0; i<pArray.length; i++){
    var pos = pArray[i].indexOf('=');
    var variable = pArray[i].substring(0, pos);
//  console.log("variable=" + variable);
    var value = pArray[i].substring(pos+1,pArray[i].length);
//  console.log("value=" + value);
    if(params.length>0){
        params = params + "&" + variable +"="+ require('querystring').escape(value);
    }else{
      params = "?"+variable+ "=" + require('querystring').escape(value);
    }
  }

  console.log(path);
  console.log(params);
  setHeaders(res);
	var options = {
	  host: url,//req.params.url,
	  port: 80,
	  path: path+params,
	  method: 'GET',
	  headers: {
        'Content-Type': 'application/json',
		'Authorization' : authHeader
		}
	};

	http.request(options, function(jira_res) {
	  //console.log('STATUS: ' + jira_res.statusCode);
	  ///console.log('HEADERS: ' + JSON.stringify(jira_res.headers));
	  jira_res.setEncoding('utf8');
	  jira_res.on('data', function (chunk) {
		output += chunk;
	  });
	  jira_res.on('end', function(){
		var obj = JSON.parse(output);
		res.send(jira_res.statusCode, obj);
	  });
	}).end();

});

app.listen(3000);
console.log('Listening on port 3000...');
