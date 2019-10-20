var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

const path = require('path');
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.use('/css', express.static(path.join(__dirname, 'public', 'css')));
app.use('/js', express.static(path.join(__dirname, 'public', 'js')));
app.use('/vendor', express.static(path.join(__dirname, 'public', 'vendor')));
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

app.set('view engine', 'ejs');

app.get('/', function(req, res){
	res.render("home")
});

app.get('/visualisation', function(req, res){
	res.render("visualisation")
});

app.get('/login_admin', function(req, res){
	res.render("login_admin")
});

app.get('/admin_page', function(req, res){
	res.render("admin_page")
});

app.post('/login', function(req,res){
	if (req.body.username == "Eclair" && req.body.password == "password"){
		res.json({success : true});
	} else {
		res.json({success : false});
	};
});


app.listen(port);