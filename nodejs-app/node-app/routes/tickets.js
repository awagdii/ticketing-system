var express = require('express');
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var User = require('./../model/User');
var Ticket = require('./../model/Ticket');
const CONSTS = require('../utils/constants');

var router = express.Router();
/* CUSTOMER ROUTES */
router.post('/', function (req, res, next) {
	const db = req.db;
	const data = req.body;
	console.log(data);
	let myData = new Ticket();
	myData.created_by = {
		user_name: data.user_name,
		id: data._id
	};
	myData.status = 'open';
	myData.description = data.data.description;
	myData.title = data.data.title;

	myData.save().then(d => {
		res.json({ success: true });
		})
		.catch(err => {
			console.log(err);
			res.status(500);
		});
});

router.get('/customer', async function (req, res, next) {
	const db = req.db;
	const customerId = req.query.customerid;
	const data = await Ticket.find({'created_by.id': customerId });
	res.json(data);
});

/* EMPLOYEE ROUTES */
router.get('/opentickets', async function (req, res, next) {
	const data = await Ticket.find({ status: CONSTS.TICKET_STATUS_OPEN });
	res.json(data);
});
router.get('/inprogress', async function (req, res, next) {
	empid = req.body.empid;
	console.log(empid)
	const data = await Ticket.find().where({ status: CONSTS.TICKET_STATUS_IN_PROGRESS, 'assigned_employee.id': empid });
	res.json(data);
});
router.patch('/assign', async function (req, res, next) {
	// console.log(req.body)
	let ticketid = req.body.ticketid;
	let empid = req.body.empid;
	const user = await User.findOne({ _id: empid }).select({ user_name: 1, _id: 0 });
	console.log(user.user_name);
	const data = await Ticket.updateOne({ 'assigned_employee.user_name': user.user_name, status: CONSTS.TICKET_STATUS_IN_PROGRESS })
		.where({ _id: ticketid });
	if (data) {
		res.status(200).json({ success: "Ticket Assigned Successfully to " + user.user_name });
	} else {
		res.json({ error: "Error Happend while processing your request" });
	}
});
router.patch('/resolve', async function (req, res, next) {
	// console.log(req.body)
	let ticketid = req.body.ticketid;
	let comment = req.body.comment;
	const data = await Ticket.updateOne({ resolve_comment: comment, status: CONSTS.TICKET_STATUS_RESOLVED })
		.where({ _id: ticketid });
	if (data) {
		res.status(200).json({ success: "Ticket Was Resolved Successfully With comment\n " + comment });
	} else {
		res.json({ error: "Error Happend while processing your request" });
	}
});

/* GET employees started tickets listing for employee. */
router.get('/:empid', function (req, res, next) {
	res.send('respond with a resource1');
});

/* GET employee takes ticket and flag it as started for employee. */
router.patch('/:id/employee/:empid', function (req, res, next) {
	res.send('respond with a resource2');
});


router.get('/customer', function (req, res, next) {
	res.send('respond with a resource');
});

module.exports = router;
