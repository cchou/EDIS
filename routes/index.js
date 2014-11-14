var express = require('express');
var router = express.Router();
var appStore = require('../articles.json');

/* GET home page. */
router.get('/', function(req, res) {
	var myArticles = [];

	myArticles = appStore.articles;
	res.render('index', {
		title: 'EDIS',
		articles: myArticles 
	});
});

/* GET about page. */
router.get('/about', function(req, res) {
  res.render('about', { 
  	title: 'About' 
  });
});

/* GET support page. */
router.get('/help', function(req, res) {
  res.render('help', { 
  	title: 'Help' 
  });
});

module.exports = router;
