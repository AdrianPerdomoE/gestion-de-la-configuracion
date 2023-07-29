"use strict"
var Order = require('../models/Order');
var OrderItem = require('../models/OrderItem')
function convertItems(list,OrderSaved){
    return list.map(item => {
        let newOrderItem = OrderItem();
        newOrderItem.order_id = OrderSaved._id;
        newOrderItem.product_id = item.product_id;
        newOrderItem.amount = item.amount;
        return newOrderItem;
    });
    
}
var OrderController = {
    saveOrder: (req, res) =>
    {
        let order = new Order();
        var params = req.body;
        order.client_id = params.client_id;
        order.value = params.value;
        order.creationDate = new Date();
        let items = params.items
    
        order.save().then((OrderSaved) => {
            if (!OrderSaved) {
                return res.status(404).send({ msg: 'Order could not be saved' })
            }
            if (items){
                items = convertItems(items,OrderSaved);
                OrderItem.insertMany(items).then((orderItemSaved)=>{
                    if (!orderItemSaved) {
                        return res.status(404).send({ msg: 'Order could not be saved' })
                    } 
                    return res.status(200).send({ msg: 'Order created successfully',  ORDER: OrderSaved });
                });
            }
            else{
                return res.status(200).send({ msg: 'Order created successfully',  ORDER: OrderSaved });
            }
        });
    },
    getOrder: function (req, res)
    
    {
        var id = req.params.id;

        if (!id) {
            return req.status(404).send({ message: 'Id was not provided' })
        }
        Order.findById(id).then((order) => {
            

            if (!order) return req.status(404).send({ message: 'The order dont exist' })

            OrderItem.find({order_id:id}).exec().then((orderItems)=>{
                if (!orderItems) {
                    return res.status(404).send({ message: 'Error at returning the data.' });
                }
                return res.status(200).send({ORDER: order, ORDERITEMS:orderItems });
            });
        });
    },
    getOrders: function(req,res){
        var client_id = req.params.id;
        Order.find({client_id:client_id}).exec().then((orders) => {
            if (!orders) {
                return res.status(404).send({ msg: "There is not orders" });
            }
            return res.status(200).send({ ORDERS: orders });
        }); 
    }
}
module.exports = OrderController
