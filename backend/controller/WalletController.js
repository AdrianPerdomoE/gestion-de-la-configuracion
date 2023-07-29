"use strict"
var Wallet = require('../models/Wallet');



var WalletController = {
    getWallet: function (req, res)
    {
        var owner_id = req.params.id;

        if (!owner_id) {
            return req.status(404).send({ message: 'Id was not provided' })
        }
        Wallet.findOne({owner_id:owner_id}).exec().then(
            (wallet) => {
                if (!wallet) {
                    return res.status(404).send({ msg: "There is not wallet" });
                }
                return res.status(200).send({WALLET:wallet });
            });
    }
}
module.exports = WalletController
