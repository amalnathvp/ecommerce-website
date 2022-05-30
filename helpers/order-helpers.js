// var db = require("../config/connection");
// var collection = require("../config/collections");
// const { response } = require("express");
// var objectId = require("mongodb").ObjectID;
// module.exports = {
//   addOrder: (order, callback) => {
//     //console.log(product);

//     db.get()
//       .collection("order")
//       .insertOne(order)
//       .then((data) => {
//         // console.log(data.insertedId)
//         callback(data.insertedId);
//       });
//   },

//   getAllOrders: () => {
//     return new Promise(async (resolve, reject) => {
//       let orders = await db
//         .get()
//         .collection(collection.ORDER_COLLECTIONS)
//         .find()
//         .toArray();
//       resolve(orders);
//       console.log(orders);
//     });
//   }
// }