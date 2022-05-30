require('dotenv').config();
var express = require('express');
var router = express.Router();
var productHelper = require('../helpers/product-helpers')
const mongoos = require("mongoose")
const session = require("express-session");
const productHelpers = require('../helpers/product-helpers');
const bannerHelpers = require('../helpers/banner-helpers');
const userHelpers = require('../helpers/user-helpers');

/* GET users listing. */
router.get('/', function(req, res, next) {
  productHelper.getAllProducts().then((products)=>{
    userHelpers.getAllOrders().then((orders)=>{
    bannerHelpers.getAllBanners().then((banners)=>{
      console.log(banners);
      res.render("admin",{admin:true, banners,products,orders})
    })
    // console.log(products);
    // res.render('admin',{admin:true, products});
  })
  })
});

router.get('/',function(req,res){
  bannerHelpers.getAllBanners().then((banners)=>{
    console.log(banners);
    res.render("admin",{admin:true, banners})
  })
})

//Product sections

//add products
router.get('/add-product',function(req,res){
  res.render('./add-product');
})

router.post('/add-product',function(req,res){
  console.log(req.body);
  console.log(req.files.image);
  productHelper.addProduct(req.body,(id)=>{
    let image=req.files.image
    console.log(id);
    image.mv('./public/images/'+id+'.jpg',(err,done)=>{
    if(!err){
      res.redirect('/admin')
    }else{
      console.log(err)
    }
    })
  });
})

//delete products
router.get('/delete-product/:id',(req,res)=>{
  let proId=req.params.id
  console.log(proId);
  productHelpers.deleteProducts(proId).then((responsive)=>{
    res.redirect('/admin')
  })
})


//edit products
router.get('/edit-product/:id',async(req,res)=>{
  let products = await productHelpers.getProductsDetails(req.params.id)
  console.log(products);
  res.render("./edit-product",{products})
})

router.post('/edit-product/:id',async(req,res)=>{
  productHelpers.updateProduct(req.params.id,req.body).then(()=>{
    let id=req.params.id
    res.redirect('/admin')
    if(req.files.image){
      let image= req.files.image
      image.mv('./public/images/'+id+'.jpg')
    }
  })
})

//Banner section

//add Banner
router.get('/add-banner',(req,res)=>{
  res.render('./add-banner');
})

router.post('/add-banner',function(req,res){
  console.log(req.body);
  console.log(req.files.image);
  bannerHelpers.addBanner(req.body,(id)=>{
    let image=req.files.image
    console.log(id);
    image.mv('./public/images/'+id+'.jpg',(err,done)=>{
    if(!err){
      res.redirect('/admin')
    }else{
      console.log(err)
    }
    })


  });
})

//delete Banner
router.get('/delete-banner/:id',(req,res)=>{
  let proId=req.params.id
  console.log(proId);
  bannerHelpers.deleteBanners(proId).then((responsive)=>{
    res.redirect('/admin')
  })
})


//edit Banner
// router.get('/edit-banner/:id',async(req,res)=>{
//   let banners = await bannerHelpers.getBannersDetails(req.params.id)
//   console.log(banners);
//   res.render("./edit-banner",{banners})
// })

// router.post('/edit-banner/:id',async(req,res)=>{
//   bannerHelpers.updateBanner(req.params.id,req.body).then(()=>{
//     let id=req.params.id
//     res.redirect('/admin')
//     if(req.files.image){
//       let image= req.files.image
//       image.mv('./public/images/'+id+'.jpg')
//     }
//   })
// })
module.exports = router;
