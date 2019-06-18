const mongoose = require('mongoose');
const User = require('./User')
const CONSTS = require('../utils/constants');

const ticket = new mongoose.Schema({
    description: String,
    status: {
        type: String,
        require: true,
        enum: [CONSTS.TICKET_STATUS_OPEN, CONSTS.TICKET_STATUS_IN_PROGRESS, CONSTS.TICKET_STATUS_RESOLVED],
        default: CONSTS.TICKET_STATUS_OPEN
    },
    createdAt: Date,
    created_by: User.schema,
    assigned_employee: User.schema,  //shouldn't we only add user id or this is how it should work?
    resolve_comments: [String] //why array? it is just one comment
});

ticket.pre('save', function (next) {

    console.log('isNew  ' + this.isNew)
    if (this.isNew) {
        this.createdAt = new Date() ;
    }
    next();
});

module.exports = mongoose.model('Ticket', ticket);


// create new Ticket example
// newUser = new User({
//     user_name: "username",
//     email: "email@mum.edu",
//     role: CONSTS.USER_ROLE_ADMIN
// });
// newTicket = new Ticket({
//     description: 'description',
//     status: CONSTS.TICKET_STATUS_OPEN,
//     created_by: newUser,
//     assigned_employee: newUser,
//     resolve_comments: ['comment1','comment2']
// });
// let doc = await newTicket.save();

// console.log(doc)
