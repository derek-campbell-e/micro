const express = require('express');
const app = express();

var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.static('assets'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.get('/', function (req, res) {
  res.render('index');
});

app.get('/civil', function(req, res){
  res.render('civil');
});

app.post('/civil/run', function(req, res){
  var civil = require('./services/civil')();
  civil.run_micro(req.body.number, req.body.total, function(items){
    res.json(items);
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
