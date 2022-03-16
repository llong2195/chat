const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please enter a name'],
    },
    email: {
        type : String,
        required: [true, 'please enter a email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'please enter a password'],
        minlength: [6, "the password should be at least 6 characters"]
    },
}, {
    timestamps: true,
})
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})
userSchema.statics.login = async function(email, password) {
    const  user = await this.findOne({ email: email});
    if (user) {
        const isAuthenticated = await bcrypt.compare(password, user.password);
        if (isAuthenticated) {
            return user;
        }
        throw Error('incorrect password');
    }else{
        throw Error('incorrect email');
    }
}
const user = mongoose.model('user', userSchema);
module.exports = user;