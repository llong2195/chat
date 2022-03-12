const mongoose = require('mongoose');
const messageSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
})


const Message = mongoose.model('message', messageSchema);
module.exports = Message;