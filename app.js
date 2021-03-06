var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var userRouter = require('./routes/user');
var adminRouter = require('./routes/admin');
var shopRouter = require('./routes/shop');
var blogdetailsRouter = require('./routes/blogdetails');
var checkoutRouter = require('./routes/checkout');
var contactRouter = require('./routes/contact');
var faqRouter = require('./routes/faq');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var blogRouter = require('./routes/blog');
var productRouter = require('./routes/product');
var shoppingcartRouter = require('./routes/shoppingCart');
var fileUpload = require('express-fileupload')
var hbs = require('express-handlebars');
var session= require('express-session')

var app = express();
var db = require('./config/connection')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs',hbs.engine({extname:'hbs',defaultLayout:'layout',layoutsDir:__dirname+'/views/layout/',partialsDir:__dirname+'/views/partials/'}))
app.use(fileUpload())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: "Key",cookie:{maxAge:600000}}))


app.use('/', userRouter);
app.use('/admin', adminRouter);
app.use('/shop', shopRouter);
app.use('/blogdetails',blogdetailsRouter);
app.use('/checkout', checkoutRouter);
app.use('/contact', contactRouter);
app.use('/faq', faqRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/blog', blogRouter);
app.use('/product', productRouter);
app.use('/shoppingcart', shoppingcartRouter);

db.connect((err)=>{
  if(err)
  console.log("Connection eror" + err);
  else
  console.log("Database Connected");

})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
