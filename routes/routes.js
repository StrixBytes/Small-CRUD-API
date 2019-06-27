const express = require('express');
const router = express.Router();
const ItemModel = require('../models/item.model');

router.get("/products", (req, res) => {
    ItemModel.find({}, { "_id": 0, "__v": 0 })
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
});

router.post("/product", (req, res) => {
    if (!req.body) return res.status(400).send('Request body is missing');

    const model = new ItemModel(req.body);
    model.save()
        .then(doc => {
            if (!doc || doc.length === 0) {
                return res.status(500).send(doc)
            }

            res.status(201).send(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
});

router.get("/product/:id", (req, res) => {
    if(!req.params.id) return res.status(400).send('Missing URL parameter: id/name');
      
    ItemModel.findOne({
        name: req.params.id
    }, { "_id": 0, "__v": 0 })
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
});

router.delete("/product/:id", (req, res) => {
    if(!req.params.id) return res.status(400).send('Missing URL parameter: id/name');

    ItemModel.findOneAndDelete({
        name: req.params.id
    })
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
});

router.put("/product/", (req, res) => {
    if(!req.query.name) return res.status(400).send('Missing URL parameter: id/name');

    ItemModel.findOneAndUpdate({
        name: req.query.name
      }, req.body, {
        new: true
      })
        .then(doc => {
          res.json(doc)
        })
        .catch(err => {
          res.status(500).json(err)
        })
});

module.exports = router;