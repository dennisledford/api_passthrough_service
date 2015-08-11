# REST API Passthrough Service
this is a node.js rest service built on express. 
The purpose of this is to be able to bypass the CORS on a jira server and make api calls to the jira server and return the results.

As of now there are two GET entry points:

GET /jira/:path this has a hardcoded variable for the url for the jira server and the path that corresponds to the jira api documentation for the path. Handles basic username:password authentication in the request header;

GET /api/:url/:path contains no authencation measures but allows you to make a REST API request to a specific URL passed in as a parameter and a custom path passed in as parameter.

