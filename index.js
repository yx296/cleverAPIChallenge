var app = require('express')();
var http = require('http').Server(app);
var request = require('request');


var options = {
  method: 'GET',
  json: {},
  uri: 'https://api.clever.com/v1.1/sections',
  headers: {
    Authorization: 'Bearer DEMO_TOKEN'
  }
};

request(options, function(err, response, body) { 
  var sections = body.data;

  var students = sections.map(function(section) {
    return section.data.students.length;
  }); 

  var allStudents = students.reduce(function(a, b) {
    return a + b;
  })

  console.log("TOTAL NUMBER OF SECTIONS", students.length);
  console.log("ALL STUDENTS", allStudents);

  var averageNumberOfStudentsPerSection = allStudents/students.length;

  console.log("AVERAGE", averageNumberOfStudentsPerSection);
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
