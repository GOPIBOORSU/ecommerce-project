const Product = require('../models/product');

// Function to show all the products
module.exports.products = async function (req, res) {
  try {
    const foundProducts = await Product.find({});
    //console.log(Product.name);
    res.send(foundProducts);
  } catch (err) {
    res.send(err);
  }
};


// module.exports.products = async function (req, res) {
//   try {
//     const foundProducts = await Product.find({});
//     const formattedProducts = foundProducts.map(product => ({
//       name: Product.name,
//       quantity: Product.quantity
//     }));
//     res.send(formattedProducts);
//   } catch (err) {
//     res.send(err);
//   }
// };

// Function to create a new product
module.exports.create = async function (req, res) {
  try {
    const newProduct = new Product({
      name: req.body.name,
      quantity: req.body.quantity
    });

    await newProduct.save();
    res.send('New product added successfully.');
  } catch (err) {
    res.send(err);
  }
};

// Function to delete a product using its ID
module.exports.delete = async function (req, res) {
  try {
    await Product.deleteOne({ _id: req.params.productID });
    res.send({
      message: 'Product deleted'
    });
  }catch(err){
    res.send(err);
  }
}

// Function to update a product's quantity
module.exports.updateQuantity = async function (req, res) {
  try {
    const ID = req.params.productID;
    // Find the product using the ID
    const found = await Product.findById(ID);
    // Note - To increment the quantity of the product, put a positive value in the query,
    // and to decrement the quantity, put a negative value in the query
    const newQty = parseInt(found.quantity) + parseInt(req.query.number);
    // Update the product's quantity
    const updatedProduct = await Product.findByIdAndUpdate(ID, { quantity: newQty });
    updatedProduct.quantity = newQty;
    res.send({
      product: updatedProduct,
      message: 'Updated successfully'
    });
  } catch (err) {
    res.send(err);
  }
};