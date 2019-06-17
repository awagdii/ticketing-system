var express = require('express');
var mongoose = require('mongoose');
var User = require('./../model/User');
var Ticket = require('./../model/Ticket');
const CONSTS = require('../utils/constants');

var router = express.Router();
//employee stuff
// /* GET open tickets listing for employee. */
// router.get('/', function (req, res, next) {
// 	const db = req.db;
// 	db.collection('tickets').find().toArray(function (err, docs) {
// 		res.json(docs);
// 	});
// 	// res.send('respond with a resource');
// });
router.get('/opentickets', async function (req, res, next) {
	const data = await Ticket.find({ status: CONSTS.TICKET_STATUS_OPEN });
	res.json(data);
});

/* GET employees started tickets listing for employee. */
router.get('/:empid', function (req, res, next) {
	res.send('respond with a resource');
});

/* GET employee takes ticket and flag it as started for employee. */
router.patch('/:id/employee/:empid', function (req, res, next) {
	res.send('respond with a resource');
});

/* GET employee resolves ticket and flag it as resolved and add comment
// for employee. */
router.post('/:id', function (req, res, next) {
	res.send('respond with a resource');
});

//customer stuff
/* GET customers tickets */
router.get('/customer', function (req, res, next) {
	res.send('respond with a resource');
});

//create new ticket for the customer
router.post('/:customerid', function (req, res, next) {
	res.send('respond with a resource');
});


module.exports = router;
