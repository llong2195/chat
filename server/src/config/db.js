const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://admin:ykOvhkaKuP9ktwI7@chat.xv4po.mongodb.net/chat-database?retryWrites=true&w=majority';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGODB_URI);
        console.log(`MongooDB connected`);
    } catch (error) {
        console.error(`Error : ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;