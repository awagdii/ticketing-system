var express = require('express');
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var User = require('./../model/User');
var Ticket = require('./../model/Ticket');
const CONSTS = require('../utils/constants');
const DB_CONFIG = require('../utils/db-config');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(DB_CONFIG.SendGridKey);

var router = express.Router();
/* Create ticket by customer */
router.post('/', function (req, res, next) {
	console.log('hi8');
	
	const data = req.body;
	let ticket = new Ticket();
	ticket.created_by = {
		user_name: data.user_name,
		id: data._id
	};
	ticket.status = 'open';
	ticket.description = data.ticketInfo.description;
	ticket.title = data.ticketInfo.title;

	ticket.save().then(d => {

		const msg = {
			to: 'ehassan@mum.edu',
			from: 'mwa@mum.edu',
			subject: 'New tickets issued',
			html: '<strong>You have new open tickets in ticketing system, please resolve them asap!</strong>',
		  };
		  sgMail.send(msg);

		res.status(201).json({ data:{success: true}});
		})
		.catch(err => {
			res.status(500);
		});
});


/* get tickets per customer */
router.get('/customer/:customerid', async function (req, res, next) {
	console.log('hi6');

	const customerId = req.params.customerid;
	const data = await Ticket.find({'created_by.id': customerId });
	res.json(data);
});

/* EMPLOYEE ROUTES */
/*get open tickets for employees */
router.get('/', async function (req, res, next) {
	const data = await Ticket.find({ status: CONSTS.TICKET_STATUS_OPEN });
	res.json(data);
});

/*get in progress tickets for employee id */
router.get('/:empid', async function (req, res, next) {
	empid = req.params.empid;
	const data = await Ticket.find().where({ status: CONSTS.TICKET_STATUS_IN_PROGRESS, 'assigned_employee.id': empid });
	res.json(data);
});

/*set a ticket as in progress tickets for employee id */
router.patch('/:empid/:ticketid', async function (req, res, next) {
	let ticketid = req.params.ticketid;
	let ticketInTheDB = await Ticket.findOne().where({ _id: ticketid })
	if (ticketInTheDB.status != CONSTS.TICKET_STATUS_OPEN) {
		return res.json({ error: "ticket already taken" });
	}
	let empid = req.params.empid;
	const user = await User.findOne({ _id: empid }).select({ user_name: 1, _id: 0 });
	const data = await Ticket.updateOne({ 'assigned_employee.user_name': user.user_name,'assigned_employee.id':empid, status: CONSTS.TICKET_STATUS_IN_PROGRESS })
		.where({ _id: ticketid });
	if (data) {
		res.status(200).json({data:{ success: "Ticket Assigned Successfully to " + user.user_name }});
	}
	else {
		res.json({data: { error: "Error Happend while processing your request" }});
	}
});

router.patch('/:ticketid', async function (req, res, next) {
	 console.log("hi3");
	let ticketid = req.params.ticketid;
	let comment = req.body.comment;
	const data = await Ticket.updateOne({ resolve_comment: comment, status: CONSTS.TICKET_STATUS_RESOLVED })
		.where({ _id: ticketid });
	if (data) {
		res.status(200).json({data:{ success: "Ticket Was Resolved Successfully With comment\n " + comment }});
	} else {
		res.json({data:{ error: "Error Happend while processing your request" }});
	}
});


module.exports = router;
