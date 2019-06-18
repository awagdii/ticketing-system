const mongoose = require('mongoose');
const User = require('./User')
const CONSTS = require('../utils/constants');

const ticket = new mongoose.Schema({
    title: String,
    description: String,
    status: {
        type: String,
        require: true,
        enum: [CONSTS.TICKET_STATUS_OPEN, CONSTS.TICKET_STATUS_IN_PROGRESS, CONSTS.TICKET_STATUS_RESOLVED],
        default: CONSTS.TICKET_STATUS_OPEN
    },
    createdAt: {
        value : Date,
        defualt: Date.now()
    },
    created_by: { user_name: String, email: String },
    assigned_employee: { user_name: String, email: String },
    resolve_comment: String
});

ticket.pre('save', function (next) {

    console.log('isNew  ' + this.isNew)
    if (this.isNew) {
        this.createdAt = Date.now() ;
    }
    next();
});

module.exports = mongoose.model('Ticket', ticket);


        // // create new Ticket example
        // for (let i = 1; i < 11; i++) {
        //     newUser = await User.findOne();
        //     console.log(newUser.user_name)
        //     newTicket = new Ticket({
        //         title: "Maintenance Issue " + i,
        //         description: 'description ' + i,
        //         status: CONSTS.TICKET_STATUS_OPEN,
        //         created_by: { user_name: newUser.user_name, email: newUser.email },
        //         assigned_employee: {},
        //         resolve_comment: ''
        //     });
        //     let doc = await newTicket.save();
        //     console.log(doc)
        // }

