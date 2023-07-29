"use strict"
var Transaction = require('../models/Transaction');
var Wallet = require("../models/Wallet");


var TransactionController = {
    saveTransaction: (req, res) =>
    {
        let transaction = new Transaction();
        var params = req.body;
        transaction.wallet_id = params.wallet_id;
        transaction.value = params.value;
        transaction.detail = params.detail;
        transaction.creationDate = Date();
        
        transaction.save().then(
            (TransactionSaved) => {
                if (!TransactionSaved) {
                    return res.status(404).send({ msg: 'Transaction could not be saved' })
                }
                Wallet.findByIdAndUpdate(params.wallet_id, {$inc:{money:params.value}}, { new: true }).then((walletUpdate) => {
                    if(walletUpdate){
                        return res.status(200).send({ msg: 'Transaction created successfully', TRANSACTION: TransactionSaved });
                    }
                    else{
                        return res.status(404).send({ msg: 'Transaction could not be saved' })
                    }
                })
                
                
                
            });
    },
    getTransaction: function (req, res)
    
    {
        var id = req.params.id;

        if (!id) {
            return req.status(404).send({ message: 'Id was not provided' })
        }
        Transaction.findById(id).then((transaction) => {
            if (!transaction) return res.status(404).send({ message: 'The transaction dont exist' })

            return res.status(200).send({ TRANSACTION: transaction });

        }); 
    },
    getTransactions: function (req, res){
        var wallet_id = req.params.id;
        Transaction.find({wallet_id:wallet_id}).exec().then((Transactions) => {
            if (!Transactions) {
                return res.status(404).send({ msg: "There is not Transactions" });
            }
            return res.status(200).send({ TRANSACTIONS: Transactions });
        });
    }
}
module.exports = TransactionController
