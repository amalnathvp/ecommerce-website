var express = require('express');
var router = express.Router();
const userHelpers=require('../helpers/user-helpers')
const verifyLogin=(req,res,next)=>{
  if(req.session.user.loggedIn){
    next()
  }else{
    res.redirect('/login')
  }
}

/* GET home page. */
router.get('/',verifyLogin,async(req, res)=> {
  let products = await userHelpers.getCartProducts(req.session.user._id)
  let totalValue = 0
  let totalOneValue = 0
  if(products.length>0){

     totalValue = await userHelpers.getTotalAmount(req.session.user._id)
     totalOneValue = await userHelpers.getTotalAmountOne(req.session.user._id)
    }
  res.render('shoppingCart',{products,user:req.session.user,totalValue,totalOneValue,});
});

module.exports = router;