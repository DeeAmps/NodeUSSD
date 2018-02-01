const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    dialogId: {
        type: Number,
        unique: true
    },
    msisdn: String,
    menuName: String,
    stage: Number,
    userInput: String,
    requestDate: {
        type: Date,
        default: Date.now
    }
});
let sessionModel = mongoose.model("sessionManager", sessionSchema);
module.exports = sessionModel;