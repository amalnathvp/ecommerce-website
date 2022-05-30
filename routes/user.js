const { response } = require('express');
var express = require('express');
var router = express.Router();
var productHelper = require('../helpers/product-helpers')
const userHelpers=require('../helpers/user-helpers')
const orderHelpers= require('../helpers/order-helpers');
const bannerHelpers = require('../helpers/banner-helpers');
var objectId = require("mongodb").ObjectId;
const verifyLogin=(req,res,next)=>{
  if(req.session.user.loggedIn){
    next()
  }else{
    res.redirect('/login')
  }
}

// /* GET home page. */
router.get('/', function(req, res, next) {
  let user=req.session.user
  productHelper.getTextilesProducts().then((Textiles)=>{
    productHelper.getElectronicsProducts().then((electronics)=>{

      bannerHelpers.getAllBanners().then((banners)=>{
        let mainBanner = banners[0]
        let mainBanner2 = banners[1]
        let womenBanner=banners[2]
        let menBanner = banners[3]
        console.log(banners[2]);
        res.render('index',{Textiles,user,mainBanner,mainBanner2,womenBanner,menBanner,electronics});
      })
        
      })
  })
});

router.get('/',function(req,res,next){
  let user=req.session.user
  bannerHelpers.getAllBanners().then((banners)=>{
    res.render('index',{banners,user})
  })

})

// router.get('/:id',async(req,res)=>{
//   let banners = await bannerHelpers.getBannersDetails(req.params.id)
//   console.log(banners);
//   res.render("index",{banners})
// })


// router.get('/',(req,res)=>{
//   res.render('login')
// })

// router.get('/',(req,res)=>{
//   res.render('register')
// })

router.post('/register',(req,res)=>{
  console.log(req.body)
  userHelpers.doSignup(req.body).then((response)=>{
    req.session.user=response.user
    req.session.user.loggedIn=true
    res.redirect('/')
  })

})

router.post('/login',(req,res)=>{
  userHelpers.doLogin(req.body).then((response)=>{
    if(response.status){
      req.session.user=response.user
      req.session.user.loggedIn=true;
      res.redirect('/')
    }else{
      req.session.userLoginErr=true
      res.redirect("/login")
      

    }
  })
})

router.get('/logout',(req,res)=>{
  req.session.user=null
  res.redirect('/login')
})


router.get('/add-to-cart/:id',verifyLogin,(req,res)=>{
  userHelpers.addToCart(req.params.id,req.session.user._id).then(()=>{
    res.redirect('/')
  })
})

router.post('/change-product-quantity',(req,res,next)=>{
  console.log(req.body);
  userHelpers.changeProductQuantity(req.body).then((response)=>{
    res.json(response)
  })
})

//section for category

//textiles sections
router.get('/textiles', function(req, res, next) {
  let user=req.session.user
  productHelper.getTextilesProducts().then((products)=>{
    res.render('shop',{products,user});
  })
});

router.get('/textiles/men', function(req, res, next) {
  let user=req.session.user
  productHelper.getTextilesMenProducts().then((products)=>{
    res.render('shop',{products,user});
  })
});

router.get('/textiles/women', function(req, res, next) {
  let user=req.session.user
  productHelper.getTextilesWomenProducts().then((products)=>{
    res.render('shop',{products,user});
  })
});

router.get('/textiles/casual', function(req, res, next) {
  let user=req.session.user
  productHelper.getTextilesCasualProducts().then((products)=>{
    res.render('shop',{products,user});
  })
});

router.get('/textiles/sport', function(req, res, next) {
  let user=req.session.user
  productHelper.getTextilesSportsProducts().then((products)=>{
    res.render('shop',{products,user});
  })
});


//electronics section
router.get('/electronics', function(req, res, next) {
  let user=req.session.user
  console.log(user);
  productHelper.getElectronicsProducts().then((products)=>{
    res.render('shop',{products,user});
  })
});

router.get('/electronics/laptop', function(req, res, next) {
  let user=req.session.user
  console.log(user);
  productHelper.getElectronicsLaptopProducts().then((products)=>{
    res.render('shop',{products,user});
  })
});

router.get('/electronics/mobiles', function(req, res, next) {
  let user=req.session.user
  console.log(user);
  productHelper.getElectronicsMobilesProducts().then((Electronics)=>{
    res.render('shop',{Electronics,user});
  })
});



//educational section
router.get('/educational', function(req, res, next) {
  let user=req.session.user
  console.log(user);
  productHelper.getEducationalProducts().then((products)=>{
    res.render('shop',{products,user});
  })
});

router.get('/educational/notebook', function(req, res, next) {
  let user=req.session.user
  console.log(user);
  productHelper.getEducationalNotebookProducts().then((products)=>{
    res.render('shop',{products,user});
  })
});

router.get('/educational/pen', function(req, res, next) {
  let user=req.session.user
  console.log(user);
  productHelper.getEducationalPenProducts().then((products)=>{
    res.render('shop',{products,user});
  })
});

router.get('/educational/pencil', function(req, res, next) {
  let user=req.session.user
  console.log(user);
  productHelper.getEducationalPencilProducts().then((products)=>{
    res.render('shop',{products,user});
  })
});

router.get('/educational/box', function(req, res, next) {
  let user=req.session.user
  console.log(user);
  productHelper.getEducationalBoxProducts().then((products)=>{
    res.render('shop',{products,user});
  })
});

//grocery section
router.get('/grocery', function(req, res, next) {
  let user=req.session.user
  console.log(user);
  productHelper.getGroceryProducts().then((products)=>{
    res.render('shop',{products,user});
  })
});

router.get('/grocery/tools', function(req, res, next) {
  let user=req.session.user
  console.log(user);
  productHelper.getGroceryToolsProducts().then((products)=>{
    res.render('shop',{products,user});
  })
});

router.get('/grocery/products', function(req, res, next) {
  let user=req.session.user
  console.log(user);
  productHelper.getGroceryProductsProducts().then((products)=>{
    res.render('shop',{products,user});
  })
});

router.get('/grocery/incredients', function(req, res, next) {
  let user=req.session.user
  console.log(user);
  productHelper.getGroceryIncredientsProducts().then((products)=>{
    res.render('shop',{products,user});
  })
});




router.get('/checkout',verifyLogin, async(req,res)=>{
  let user=req.session.user
  let total = await userHelpers.getTotalAmount(req.session.user._id)
  res.render('checkout',{total,user})
})

router.post('/checkout',verifyLogin, async(req,res)=>{
  // let products = await userHelpers.getCartProductList(req.body.userId)
  let totalPrice = await userHelpers.getTotalAmount(req.body.userId)
  let products1 = await userHelpers.getCartProducts(req.session.user._id)
  userHelpers.placeOrder(req.body,totalPrice,products1).then((response)=>{
    console.log(products1);
    res.redirect('/order')

  })
})

router.get('/order',verifyLogin,async(req,res)=>{
  let user=req.session.order
  
  userHelpers.getAllOrders().then((orders)=>{
    // userHelpers.getCartProducts().then((products)=>{

      console.log(orders);
      res.render('order',{user,orders})
    // })
  })
})







// router.post('/checkout',function(req,res){
//   console.log(req.body);
 
//   orderHelpers.addOrder(req.body,(id)=>{
//     console.log(id);
//     if(!err){
//       res.redirect('/checkout')
//     }else{
//       console.log(err)
//     }
//     })


//   });







module.exports = router;
