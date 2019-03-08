const express = require('express')
const app = express()
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Studio = require('./models/studio');



app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


var port = process.env.PORT || 3000;

// mongoose.connect('mongodb://localhost:27017/SmeeaganAPI');
mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost:27017/NamasteAPI');

var router = express.Router();

// Routes fixed with API prefix
app.use('/api', router);

// Middleware
// middleware to use for all requests
router.use(function(req, res, next) {

    console.log("Hello, processing going down... aight.. hang tight")
    next()
})

// TEST ROUTE
router.get('/', (req, res) => {
    res.json({message: 'Welcome to our API!'})
})

//
router.route('/Studios')
    .post(function(req, res) {

        var studio = new Studio()
            studio.name = req.body.name;
            studio.location = req.body.location;
            studio.photo = req.body.photo;


        Studio.save(function(err) {
            if (err) {
                res.send(err);
            }
            // res.json(req.body)
            res.json({message: "Studio was successfully created"});
        });
    })

    .get(function(req, res) {
        Studio.find(function(err, products) {
            if (err) {
                res.send(err);
            }
            res.json(products);
        });
    });

router.route('/studio/:studio_id')
    .get(function(req, res) {
        Studio.findById(req.params.studio_id, function(err, product) {
            if (err) {
                res.send(err);
            }
            res.json(product);
        });
    });

router.route('/studio/photo/:photo')
    .get(function(req, res) {
        Studio.find({photo:req.params.photo}, function(err, product) {
            if (err) {
                res.send(err);
            }
            res.json(product);
        });
    });

    router.route('/studio/category/:category')
        .get(function(req, res) {
            Studio.find({category:req.params.category}, function(err, product) {
                if (err) {
                    res.send(err);
                }
                res.json(product);
            });
        });






app.listen(port);
console.log('Server listening on port ' + port);
