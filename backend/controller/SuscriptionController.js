"use strict"
var Suscription = require('../models/Suscription');
var suscriptionController = {
    saveSuscription: (req, res) =>
    {
        let suscription = new Suscription();
        var params = req.body;
        suscription.suscriptor_id = params.suscriptor_id;
        suscription.pyme_id = params.pyme_id;
        suscription.charge = params.charge;
        suscription.creationDate = Date();
        
        suscription.save().then((suscriptionSaved) => {
            if (!suscriptionSaved) {
                return res.status(404).send({ msg: 'Suscription could not be saved' })
            }
            return res.status(200).send({ msg: 'Suscription created successfully', SUSCRIPTION: suscriptionSaved });
        });
    },
    getSuscription: function (req, res)
    
    {
        var id = req.params.id;

        if (!id) {
            return req.status(404).send({ message: 'Id was not provided' })
        }
        Suscription.findById(id).then(
            (suscription) => {
                if (!suscription) return req.status(404).send({ message: 'The suscription dont exist' })
    
                return res.status(200).send({ SUSCRIPTION: suscription });
    
            });
    },
    getSuscriptionsUser: function (req, res){
        var suscriptor_id = req.params.id;
        Suscription.find({suscriptor_id:suscriptor_id}).exec().then((suscriptions) => {
            if (!suscriptions) {
                return res.status(404).send({ msg: "There is not suscriptions" });
            }
            return res.status(200).send({ SUSCRIPTIONS: suscriptions });
        });
    },
    getSuscriptionsPyme: function (req, res){
        var pyme_id = req.params.id;
        Suscription.find({pyme_id:pyme_id}).exec().then((suscriptions) => {
            if (!suscriptions) {
                return res.status(404).send({ msg: "There is not suscriptions" });
            }
            return res.status(200).send({ SUSCRIPTIONS: suscriptions });
        });
    }
}
module.exports = suscriptionController
