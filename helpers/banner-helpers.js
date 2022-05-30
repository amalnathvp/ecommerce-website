var db = require("../config/connection");
var collection = require("../config/collections");
const { response } = require("express");
var objectId = require("mongodb").ObjectID;
module.exports = {
    addBanner: (banner, callback) => {
      //console.log(banner);
  
      db.get()
        .collection("banner")
        .insertOne(banner)
        .then((data) => {
          // console.log(data.insertedId)
          callback(data.insertedId);
        });
    },
  
    getAllBanners: () => {
      return new Promise(async (resolve, reject) => {
        let banners = await db
          .get()
          .collection(collection.BANNER_COLLECTIONS)
          .find()
          .toArray();
        resolve(banners);
      });
    },
    deleteBanners: (prodId) => {
      return new Promise((resolve, reject) => {
        db.get()
          .collection(collection.BANNER_COLLECTIONS)
          .deleteOne({ _id: objectId(prodId) })
          .then((response) => {
            console.log(response);
            resolve(response);
          });
      });
    },
    getBannersDetails: (proId) => {
      return new Promise((resolve, reject) => {
        db.get()
          .collection(collection.PRODUCT_COLLECTIONS)
          .findOne({ _id: objectId(proId) })
          .then((banners) => {
            resolve(banners);
          });
      });
    },
    updateBanner:(proId,proDetails) => {
        return new Promise ((resolve,reject) => {
            db.get().collection(collection.BANNER_COLLECTIONS).updateOne({_id:objectId(proId)},{
                $set:{
                    banner_name:proDetails.banner_name,
  
                }
            }).then((response)=>{
                resolve()
            })
        })
    }
}