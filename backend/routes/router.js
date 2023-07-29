"use strict"
// configuración de las rutas

var express = require("express");
var router = express.Router();

//importacion de controladores 
var ProductController = require('../controller/ProductController')
var UserController = require('../controller/UserController')
var PymeController = require('../controller/PymeController')
var PymeController = require('../controller/PymeController')
var OrderController = require('../controller/OrderController')
var WalletController = require('../controller/WalletController')
var TransactionController = require('../controller/TransactionController')
var SuscriptionController = require('../controller/SuscriptionController')
var InvestmentController = require('../controller/InvestmentController')

var multipart = require("connect-multiparty");
var multipartMiddleWare = multipart({ uploadDir: "./img" });

//rutas para User
router.post('/saveUser',UserController.saveUser);
router.get('/getUser/:id',UserController.getUser);
router.get('/getExistenceUser/:id',UserController.getExistence);
router.put('/updateUser/:id',UserController.updateUser);
router.put('/updateKart/:id',UserController.updateKart);
router.get('/getKart/:id',UserController.getKart)
router.post('/confirmPassword', UserController.confirmPassword);
//rutas para PYMES
router.post('/savePyme',PymeController.savePyme);
router.post('/confirmPasswordPyme', PymeController.confirmPassword);
router.get('/getPyme/:id',PymeController.getPyme);
router.get('/getPymes',PymeController.getPymes);
router.get('/getPymesByCategory/:searchBy',PymeController.getPymesByCategory);
router.get('/getExistencePyme/:id',PymeController.getExistence);
router.put('/updatePyme/:id',PymeController.updatePyme);
router.post("/UploadImagePyme/:id", multipartMiddleWare, PymeController.uploadImagen);
//rutas para producto
router.post("/SaveProduct", ProductController.saveProduct);
router.get("/GetProduct/:id", ProductController.getProduct);
router.get("/GetProducts", ProductController.getProducts);
router.put("/UpdateProduct/:id", ProductController.updateProduct);
router.delete("/DeleteProduct/:id", ProductController.deleteProduct);
router.post("/UploadImagen/:id", multipartMiddleWare, ProductController.uploadImagen);
router.get("/GetImage/:image", ProductController.getImageFile);
router.get("/getProductByName/:searchBy", ProductController.getProductByName);
router.get("/getProductsById/:id", ProductController.getProductsById);
//rutas para las ordenes
router.post('/saveOrder',OrderController.saveOrder);
router.get('/getOrder/:id',OrderController.getOrder);
router.get('/getOrders/:id',OrderController.getOrders);
// ruta para la billetera
router.get('/getWallet/:id',WalletController.getWallet);
//rutas para suscripciones
router.post('/saveSuscription',SuscriptionController.saveSuscription);
router.get('/getSuscription/:id',SuscriptionController.getSuscription);
router.get('/getSuscriptionsUser/:id',SuscriptionController.getSuscriptionsUser);
router.get('/getSuscriptionsPyme/:id',SuscriptionController.getSuscriptionsPyme);
//rutas para inversiones
router.post('/saveInvestment',InvestmentController.saveInvestment);
router.get('/getInvestment/:id',InvestmentController.getInvestment);
router.get('/getInvestmentsUser/:id',InvestmentController.getInvestmentsUser);
router.get('/getInvestmentsPyme/:id',InvestmentController.getInvestmentsPyme);
//rutas para transacciones
router.post('/saveTransaction',TransactionController.saveTransaction);
router.get('/getTransaction/:id',TransactionController.getTransaction);
router.get('/getTransactions/:id',TransactionController.getTransactions);
// Se exporta el modulo para importarlo en app

module.exports = router;