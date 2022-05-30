var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.userLoggedIn){
    res.redirect('/');
  }else{

  res.render('login', {"loginErr":req.session.userLoginErr});
  req.session.userLoginErr=false
  }
});

module.exports = router;