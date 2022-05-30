var db = require("../config/connection");
var collection = require("../config/collections");
const { response } = require("express");
var objectId = require("mongodb").ObjectID;
module.exports = {
  addProduct: (product, callback) => {
    //console.log(product);

    db.get()
      .collection("product")
      .insertOne(product)
      .then((data) => {
        // console.log(data.insertedId)
        callback(data.insertedId);
      });
  },

  getAllProducts: () => {
    return new Promise(async (resolve, reject) => {
      let products = await db
        .get()
        .collection(collection.PRODUCT_COLLECTIONS)
        .find()
        .toArray();
      resolve(products);
    });
  },
  deleteProducts: (prodId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.PRODUCT_COLLECTIONS)
        .deleteOne({ _id: objectId(prodId) })
        .then((response) => {
          console.log(response);
          resolve(response);
        });
    });
  },
  getProductsDetails: (proId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.PRODUCT_COLLECTIONS)
        .findOne({ _id: objectId(proId) })
        .then((products) => {
          resolve(products);
        });
    });
  },
  updateProduct:(proId,proDetails) => {
      return new Promise ((resolve,reject) => {
          db.get().collection(collection.PRODUCT_COLLECTIONS).updateOne({_id:objectId(proId)},{
              $set:{
                  product_id:proDetails.product_id,
                  product_name:proDetails.product_name,
                  product_category:proDetails.product_category,
                  product_subcategory:proDetails.product_subcategory,
                  product_price:proDetails.product_price,
                  product_old_price: proDetails.product_old_price,
                  product_description: proDetails.product_description

              }
          }).then((response)=>{
              resolve()
          })
      })
  },

  //textiles section
  getTextilesProducts: () => {
    return new Promise(async (resolve, reject) => {
      let Textiles = await db
        .get()
        .collection(collection.PRODUCT_COLLECTIONS)
        .find({product_category:"Textiles"})
        .toArray();
      resolve(Textiles);
      console.log(Textiles);
    });
  },

  //men shoes
  getTextilesWomenProducts: () => {
    return new Promise(async (resolve, reject) => {
      let women = await db
        .get()
        .collection(collection.PRODUCT_COLLECTIONS)
        .find({$and:[{product_category:"Textiles"},{product_subcategory:"Women"}]})
        .toArray();
      resolve(women);
      console.log(women);
    });
  },

  //men clothing
  getTextilesMenProducts: () => {
    return new Promise(async (resolve, reject) => {
      let Men = await db
        .get()
        .collection(collection.PRODUCT_COLLECTIONS)
        .find({$and:[{product_category:"Textiles"},{product_subcategory:"Men"}]})
        .toArray();
      resolve(Men);
      console.log(Men);
    });
  },

  //men accessories
  getTextilesKidsProducts: () => {
    return new Promise(async (resolve, reject) => {
      let Kids = await db
        .get()
        .collection(collection.PRODUCT_COLLECTIONS)
        .find({$and:[{product_category:"Textiles"},{product_subcategory:"Kids"}]})
        .toArray();
      resolve(Kids);
      console.log(Kids);
    });
  },



  getTextilesCasualProducts: () => {
    return new Promise(async (resolve, reject) => {
      let casual = await db
        .get()
        .collection(collection.PRODUCT_COLLECTIONS)
        .find({$and:[{product_category:"Textiles"},{product_subcategory:"Casual Wear"}]})
        .toArray();
      resolve(casual);
      console.log(casual);
    });
  },

  getTextilesSportsProducts: () => {
    return new Promise(async (resolve, reject) => {
      let sports = await db
        .get()
        .collection(collection.PRODUCT_COLLECTIONS)
        .find({$and:[{product_category:"Textiles"},{product_subcategory:"Sport Wear"}]})
        .toArray();
      resolve(sports);
      console.log(sports);
    });
  },

  getElectronicsProducts: () => {
    return new Promise(async (resolve, reject) => {
      let electronics = await db
        .get()
        .collection(collection.PRODUCT_COLLECTIONS)
        .find({product_category:"Electronics"})
        .toArray();
      resolve(electronics);
      console.log(electronics);
    });
  },

  //women shoes
  getElectronicsLaptopProducts: () => {
    return new Promise(async (resolve, reject) => {
      let laptop = await db
        .get()
        .collection(collection.PRODUCT_COLLECTIONS)
        .find({$and:[{product_category:"Electronics"},{product_subcategory:"Laptop"}]})
        .toArray();
      resolve(laptop);
      console.log(laptop);
    });
  },

  getElectronicsMobilesProducts: () => {
    return new Promise(async (resolve, reject) => {
      let mobile = await db
        .get()
        .collection(collection.PRODUCT_COLLECTIONS)
        .find({$and:[{product_category:"Electronics"},{product_subcategory:"Mobile"}]})
        .toArray();
      resolve(mobile);
      console.log(mobile);
    });
  },

  

  getEducationalProducts: () => {
    return new Promise(async (resolve, reject) => {
      let educational = await db
        .get()
        .collection(collection.PRODUCT_COLLECTIONS)
        .find({product_category:"Educational Items"})
        .toArray();
      resolve(educational);
      console.log(educational);
    });
  },

  //women accessories
  getEducationalNotebookProducts: () => {
    return new Promise(async (resolve, reject) => {
      let notebook = await db
        .get()
        .collection(collection.PRODUCT_COLLECTIONS)
        .find({$and:[{product_category:"Educational Items"},{product_subcategory:"Notebook"}]})
        .toArray();
      resolve(notebook);
      console.log(notebook);
    });
  },

  getEducationalPenProducts: () => {
    return new Promise(async (resolve, reject) => {
      let pen = await db
        .get()
        .collection(collection.PRODUCT_COLLECTIONS)
        .find({$and:[{product_category:"Educational Items"},{product_subcategory:"Pen"}]})
        .toArray();
      resolve(pen);
      console.log(pen);
    });
  },

  getEducationalPencilProducts: () => {
    return new Promise(async (resolve, reject) => {
      let pencil = await db
        .get()
        .collection(collection.PRODUCT_COLLECTIONS)
        .find({$and:[{product_category:"Educational Items"},{product_subcategory:"Pencil"}]})
        .toArray();
      resolve(pencil);
      console.log(pencil);
    });
  },

  getEducationalBoxProducts: () => {
    return new Promise(async (resolve, reject) => {
      let box = await db
        .get()
        .collection(collection.PRODUCT_COLLECTIONS)
        .find({$and:[{product_category:"Educational Items"},{product_subcategory:"Pencil Box"}]})
        .toArray();
      resolve(box);
      console.log(box);
    });
  },


  //kids section
  getGroceryProducts: () => {
    return new Promise(async (resolve, reject) => {
      let grocery = await db
        .get()
        .collection(collection.PRODUCT_COLLECTIONS)
        .find({product_category:"Grocery"})
        .toArray();
      resolve(grocery);
      console.log(grocery);
    });
  },


//kids shoes
  getGroceryToolsProducts: () => {
    return new Promise(async (resolve, reject) => {
      let tools = await db
        .get()
        .collection(collection.PRODUCT_COLLECTIONS)
        .find({$and:[{ product_category:"Grocery"},{product_subcategory:"Kitchen Tools"}]
          })
        .toArray();
      resolve(tools);
      console.log(tools);
    });
  },

  getGroceryProductsProducts: () => {
    return new Promise(async (resolve, reject) => {
      let kitchenproducts = await db
        .get()
        .collection(collection.PRODUCT_COLLECTIONS)
        .find({$and:[{ product_category:"Grocery"},{product_subcategory:"Kitchen Products"}]
          })
        .toArray();
      resolve(kitchenproducts);
      console.log(kitchenproducts);
    });
  },

  getGroceryIncredientsProducts: () => {
    return new Promise(async (resolve, reject) => {
      let tools = await db
        .get()
        .collection(collection.PRODUCT_COLLECTIONS)
        .find({$and:[{ product_category:"Grocery"},{product_subcategory:"Cooking Incredients"}]
          })
        .toArray();
      resolve(tools);
      console.log(tools);
    });
  },

  
};
