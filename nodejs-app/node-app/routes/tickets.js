var express = require('express');
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
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
router.post('/:customerid', function (req, res, next) {
	const db = req.db;
	console.log('cust '+req.params.customerid);
	const userId = req.params.customerid;
	const data = req.body;
	// const ticketValue = [{
	// 	status : 'open',
	// 	resolveComments: {
	// 		0 : '',
	// 		1: ''
	// 	},
	// 	description : data.description
	// }];
	data.created_by = {'_id':new ObjectId(userId._id),'user_name':userId.user_name,'email':userId.email};
	console.log(data);
	let ticket = new Ticket(data);
	console.log('ticket:' +ticket);
	//ticket.created_by = new ObjectId(userId);
	ticket.save().then(d => {
		res.json({success:true});
	})
	.catch(err => {
		console.log(err);
		res.status(500);
	});
//	res.send('respond with a resource4');
});
router.get('/opentickets', async function (req, res, next) {
	const data = await Ticket.find({ status: CONSTS.TICKET_STATUS_OPEN });
	res.json(data);
});
router.get('/customer', async function (req, res, next) {
	const db = req.db;
	const customerId = req.query.customerid;
	const data = await Ticket.find({'created_by.role':'customer', 'created_by._id':customerId});
	res.json(data);
});

/* GET employees started tickets listing for employee. */
router.get('/:empid', function (req, res, next) {
	res.send('respond with a resource1');
});

/* GET employee takes ticket and flag it as started for employee. */
router.patch('/:id/employee/:empid', function (req, res, next) {
	res.send('respond with a resource2');
});

/* GET employee resolves ticket and flag it as resolved and add comment
// for employee. */
// router.post('/:id', function (req, res, next) {
// 	console.log("PSDA SWE");
// 	res.send('respond with a resource3');
// });

//customer stuff
/* GET customers tickets */
router.get('/customer', function (req, res, next) {
	res.send('respond with a resource');
});

//create new ticket for the customer



module.exports = router;
