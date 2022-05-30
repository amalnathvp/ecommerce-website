var db=require('../config/connection')
var collection=require('../config/collections')
const bcrypt=require('bcrypt');
const { response } = require('express');
const { ObjectID } = require('bson');
var objectId = require("mongodb").ObjectID;
module.exports={

    //to get data from register
    doSignup:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            const salt= await bcrypt.genSalt(10)
            userData.Password= await
            bcrypt.hash(userData.Password,salt)
            db.get().collection(collection.USER_COLLECTIONS).insertOne(userData).then((data)=>{
                resolve(data)
                console.log(data);

            })
        })
    },
    //check data and logging in
    doLogin:(userData)=>{
        return new Promise(async (resolve,reject)=>{
            let loginStatus = false;
            let response={}
            let user = await db.get().collection(collection.USER_COLLECTIONS).findOne({Email:userData.Email})
            if(user){
                bcrypt.compare(userData.Password,user.Password).then((status)=>{
                    if(status){
                        console.log("login success")
                        response.user=user;
                        response.status=true;
                        resolve(response)
                    }else{
                        console.log("login failed");
                        resolve({status:false})
                    }
                })
            }else{
                console.log("login falied")
                resolve({status:false})
            }
        })
    },
    addToCart:(proId,userId)=>{
        let proObj={
            item:objectId(proId),
            quantity:1
        }
        return new Promise(async(resolve,reject)=>{
            let userCart= await db.get().collection(collection.CART_COLLECTIONS).findOne({user:objectId(userId)})
            if(userCart){
                let proExist = userCart.products.findIndex(product=>product.item==proId)
                console.log(proExist);

                if(proExist!=-1){
                    db.get().collection(collection.CART_COLLECTIONS).updateOne({"products.item":objectId(proId)},
                    {
                        $inc:{"products.$.quantity":1}
                    }).then(()=>{
                        resolve()
                    })
                }else{

                db.get().collection(collection.CART_COLLECTIONS)
                .updateOne({user:objectId(userId)},
                {
                    
                        // $push:{products:objectId(proId)}
                        $push:{products:proObj}
                
                }).then((response)=>{
                    resolve()
                })
                // .catch((err)=>{
                //     console.log(err)
                // })

            }

            }else{
                let cartObj={
                    user:objectId(userId),
                    products:[proObj]
                    // products:[objectId(proId)]
                }
                db.get().collection(collection.CART_COLLECTIONS).insertOne(cartObj).then((response)=>{
                    resolve()
                })
            }
        })
    },
    getCartProducts:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            let cartItems=await db.get().collection(collection.CART_COLLECTIONS).aggregate([
                {
                    $match:{user:objectId(userId)}
                },{
                    $unwind:'$products'
                },{
                    $project:{
                        item: '$products.item',
                        quantity :"$products.quantity"
                    }
                },{
                    $lookup:{
                        from:collection.PRODUCT_COLLECTIONS,
                        localField:'item',
                        foreignField:'_id',
                        as:'product'
                    }
                },{
                    $project:{
                        item:1,quantity:1,product:{$arrayElemAt:['$product',0]}
                    }
                }
                
            ]).toArray()
            resolve(cartItems)
        })
    },

    changeProductQuantity:(details)=>{
        details.count=parseInt(details.count)
        details.quantity=parseInt(details.quantity)

        return new Promise((resolve,reject)=>{
            if(details.count==-1 && details.quantity==1){
                db.get().collection(collection.CART_COLLECTIONS)
                .updateOne({_id:objectId(details.cart)},
                {
                    $pull:{products:{item:objectId(details.product)}}
                }).then((response)=>{
                    resolve({removeProduct:true})
                })
            }else{
                db.get().collection(collection.CART_COLLECTIONS)
                .updateOne({_id:objectId(details.cart),'products.item':objectId(details.product)},
                {
                    $inc:{'products.$.quantity':details.count}
                }).then((response)=>{
                    resolve(true)
                })
            }
        })
    },

    getTotalAmount:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            let total=await db.get().collection(collection.CART_COLLECTIONS).aggregate([
                {
                    $match:{user:objectId(userId)}
                },{
                    $unwind:'$products'
                },{
                    $project:{
                        item: '$products.item',
                        quantity :"$products.quantity"
                    }
                },{
                    $lookup:{
                        from:collection.PRODUCT_COLLECTIONS,
                        localField:'item',
                        foreignField:'_id',
                        as:'product'
                    }
                },{
                    $project:{
                        item:1,quantity:1,product:{$arrayElemAt:['$product',0]}
                    }
                },
                
                {
                    $group:{
                        _id:null,
                        total:{$sum:{$multiply:['$quantity',{$toDouble:'$product.product_price'}]}}
                    }
                }
                
            ]).toArray()
            // console.log(total);
            resolve(total[0].total)
        })
        
    },

    getTotalAmountOne:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            let total=await db.get().collection(collection.CART_COLLECTIONS).aggregate([
                {
                    $match:{user:objectId(userId)}
                },{
                    $unwind:'$products'
                },{
                    $project:{
                        item: '$products.item',
                        quantity :"$products.quantity"
                    }
                },{
                    $lookup:{
                        from:collection.PRODUCT_COLLECTIONS,
                        localField:'item',
                        foreignField:'_id',
                        as:'product'
                    }
                },{
                    $project:{
                        item:1,quantity:1,product:{$arrayElemAt:['$product',0]}
                    }
                },
                
                {
                    $group:{
                        _id:null,
                        total:{$sum:{$multiply:['$quantity',{$toDouble:'$product.product_price'}]}}
                    }
                }
                
            ]).toArray()
            // console.log(total);
            resolve(total[0].total)
        })
        
    },

    getCartCount:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            let count=0
            let cart=await db.get().collection(collection.CART_COLLECTIONS).findOne({user:objectId(userId)})
            if(cart){
                count=cart.products.length
            }
            resolve(count)
        })
    },

    placeOrder:(order,total,products1)=>{
        return new Promise((resolve,reject)=>{
            // console.log(order,products,total);
            let status = order.payment_method==='COD'?'placed':'pending'
            let orderObj={
                deliveryDetails:{
                    first_name:order.first_name,
                    last_name:order.last_name,
                    country:order.country,
                    street_address:order.street_address,
                    postcode:order.postcode,
                    town:order.postcode,
                    town:order.town,
                    email:order.email,
                    phone:order.phone,
                },
                userId:objectId(order.userId),
                paymentMethod:order.payment_method,
                product:products1,
                // products:products,
                totalAmount:total,
                status:status,
                date: new Date()
            }
            db.get().collection(collection.ORDER_COLLECTIONS).insertOne(orderObj).then((response)=>{
                resolve()
            })
        })
    },

    getCartProductList:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            let cart=await db.get().collection(collection.CART_COLLECTIONS).findOne({user:objectId(userId)})
            resolve(cart.products)
        })
    },

    

    getAllOrders: () => {
        return new Promise(async (resolve, reject) => {
          let orders = await db
            .get()
            .collection(collection.ORDER_COLLECTIONS)
            .find()
            .toArray();
          resolve(orders);
        });
      }

    
}