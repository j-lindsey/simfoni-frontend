var bodyParser = require('body-parser');
const path = require('path');
const router = require('express').Router();
//var express = require('express');
var _ = require('underscore');
var db = require('./db');
//var session = require('express-session');
//const { result } = require('underscore');
//const app = express();
var executeQuery = async function (query) {
  var connectionPool = await db;
  var result = await connectionPool.request().query(query);
  return result.recordset;
}

//send json formatted record set as a response
var sendQueryResults = async function (res, query) {
  try {
    var recordset = await executeQuery(query);
    res.json(recordset);
  }
  catch (err) {
    res.send({
      success: false,
      error: err
    });
  }
};

//var app = express();
//router.use(bodyParser.json());//used to get the req.body contenet as json
//router.get('/', (req, res) => {
router.get('/', function (req, res) {
  res.send('Hello World!');
});

//-----------------------For testing you can use POSTMAN-------------------------------

router.get('/form', function (req, res) {
  res.sendFile(path.resolve('../html/login.html'));
  //res.sendFile('../../html/login.html', { root: __dirname });
  //res.sendFile( __dirname + "/" + "index.html" );    //load the index.html form 
});

//var urlencodedParser = bodyParser.urlencoded({ extended: false })
//=======================verify password == accounts===============
router.get('/form2', function (req, res)
//router.get('/form',function (req, res)
{
  res.sendFile(__dirname + "/" + "login.html");    //load the login.html form 
});
//var urlencodedParser = bodyParser.urlencoded({ extended: false })
//==
router.post('/vlogin', urlencodedParser, function (req, res) {
  //console.log (req.body.username);
  var response = {//modify the html form and the following
    // username:req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  var sql = "SELECT * FROM Registration WHERE Email= '" + response.email + "' and Password = '" + response.password + "'";
  //var sql = "SELECT * FROM accounts WHERE email= '"+response.email+"' and password = '"+response.password+"'";
  //var sql = "SELECT * FROM accounts WHERE username = '"+response.username+"' and password = '"+response.password+"'";

  executeQuery(sql).then(result => {
    console.log(result[0].MemberID);
    console.log(result.length);
    if (result.length > 0) {
      console.log(result);
      return res.redirect(`../goals/profile/${result[0].MemberID}`);
      
    }
    else {
      return res.status(404).send('Incorrect username and password. Please contact at helpdesk@simfoni.com');
    }
  }
  );
});


//create a routes to access the page from front end 
module.exports = router;