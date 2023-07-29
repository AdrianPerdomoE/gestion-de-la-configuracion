"use strict";
var Product = require("../models/Product");
var fs = require("fs");
var path = require("path");
const { exists } = require("../models/Product");
var productController = {
  saveProduct: (req, res) => {
    let product = new Product();
    var params = req.body;
    product.name = params.name;
    product.pyme_id = params.pyme_id;
    product.price = params.price;
    product.stock = params.stock;
    product.description = params.description;
    product.ignored = false;
    product.creationDate = Date();
    product.updateDate = Date();
    product.image = null;
    product
      .save()
      .then((productStored) => {
        if (!productStored) {
          return res.status(404).send({ msg: "Product could not be saved" });
        }
        return res
          .status(200)
          .send({ msg: "Product added successfully", PRODUCT: productStored });
      })
      .catch((error) => {
        return res.status(500).send({ msg: "Error", error });
      });
  },
  getProduct: (req, res) => {
    var product_id = req.params.id;
    Product.findById(product_id).then((product) => {
      if (!product) {
        return res.status(404).send({ msg: "The product dont exist" });
      }
      return res.status(200).send({ PRODUCT: product });
    });
  },
  getProducts: (req, res) => {
    Product.find({})
      .exec()
      .then((products) => {
        if (!products) {
          return res.status(404).send({ msg: "There is not products" });
        }
        return res.status(200).send({ PRODUCTS: products });
      });
  },
  getProductsById: (req, res) => {
    var id = req.params.id;
    Product.find({ pyme_id: id })
      .exec()
      .then((products) => {
        if (!products) {
          return res.status(404).send({ msg: "There is no products" });
        }
        return res.status(200).send({ PRODUCTS: products });
      });
  },
  updateProduct: (req, res) => {
    var product_id = req.params.id;
    var upData = req.body;
    upData.updateDate = new Date();
    Product.findByIdAndUpdate(product_id, upData, { new: true }).then(
      (productUpDated) => {
        if (!productUpDated) {
          return res.status(404).send({ msg: "Product could no be found" });
        }
        return res.status(200).send({
          msg: "Product updated successfully",
          PRODUCT: productUpDated,
        });
      }
    );
  },
  deleteProduct: (req, res) => {
    var product_id = req.params.id;
    Product.findByIdAndRemove(product_id).then((productDeleted) => {
      if (!productDeleted) {
        return res.status(404).send({ msg: "Product could not be found" });
      }
      return res
        .status(200)
        .send({ msg: "Product deleted successfully", PRODUCT: productDeleted });
    });
  },
  uploadImagen: (req, res) => {
    var product_id = req.params.id;
    var fileName = "Image_not_upload";

    if (req.files) {
      var filePath = req.files.image.path;
      var fileSplit = filePath.split("\\");
      var fileName = fileSplit[1];
      var extSplit = fileName.split(".");
      var fileExt = extSplit[1];
      if (
        fileExt == "png" ||
        fileExt == "jpg" ||
        fileExt == "jpeg" ||
        fileExt == "gif"
      ) {
        Product.findByIdAndUpdate(
          product_id,
          { image: fileName },
          { new: true }
        ).then((productUpdated) => {
          if (!productUpdated) {
            return res.status(404).send({ msg: "The image dont exist" });
          }
          return res.status(200).send({ PRODUCT: productUpdated });
        });
      } else {
        fs.unlink(filePath, (err) => {
          return res.status(200).send({ msg: "Extension is not valid" });
        });
      }
    } else {
      return res.status(500).send({ msg: "files was not upload" });
    }
  },
  getImageFile: (req, res) => {
    // Metodo para devolver la ruta de la imagen
    var file = req.params.image;
    var path_file = `./img/${file}`;
    fs.exists(path_file, (exists) => {
      if (exists) {
        return res.sendFile(path.resolve(path_file));
      } else {
        return res.status(200).send({ msg: "Image dont exist..." });
      }
    });
  },
  getProductByName: (req, res) => {
    let productName = new RegExp(`${req.params.searchBy}`, "i");
    Product.find({ name: productName })
      .exec()
      .then((products) => {
        if (!products) {
          return res.status(404).send({ msg: "There is not products" });
        }
        return res.status(200).send({ PRODUCTS: products });
      });
  },
};

module.exports = productController;
