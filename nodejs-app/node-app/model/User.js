
const mongoose = require('mongoose');
const CONSTS = require('../utils/constants');

const user = new mongoose.Schema({
    user_name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    role: {
        type: String,
        require: true,
        enum: [CONSTS.USER_ROLE_ADMIN, CONSTS.USER_ROLE_CUSTOMER, CONSTS.USER_ROLE_EMPLOYEE],
        default: CONSTS.USER_ROLE_CUSTOMER
    },
    createdAt: Date
});

user.pre('save', function (next) {

    console.log('isNew  ' + this.isNew)
    if (this.isNew) {
        this.createdAt = new Date() | Date;
    }
    next();
});

module.exports = mongoose.model('User', user);


// create new User example
// newUser = new User({
//     user_name: "AHMED",
//     email: "email@mum.edu",
//     role: CONSTS.USER_ROLE_ADMIN
// });
// let doc = await newUser.save();

// console.log(doc)
