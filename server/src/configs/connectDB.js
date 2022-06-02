const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            autoIndex: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000
        })
        console.log('Connected DB successfully!');
    } catch (error) {
        console.log(error)
        console.log("Connected DB failed!");
        process.exit(0)
    }
}

mongoose.connection.on('connected', () => {
    console.log("Connected MongoDB..........");
})
mongoose.connection.on('connecting', () => {
    console.log("Connecting MongoDB..........");
})
mongoose.connection.on('disconnecting', () => {
    console.log("Disconnecting MongoDB..........");
})
mongoose.connection.on('disconnected', () => {
    console.log("Disconnected MongoDB..........");
})
mongoose.connection.on('reconnectFailed', (error) => {
    console.log(error.message);
    console.log("ReconnectFailed MongoDB..........");
    process.exit(1);
})
mongoose.connection.on('reconnected', () => {
    console.log("Reconnected MongoDB..........");
})
mongoose.connection.on('error', (error) => {
    console.log(error.message);
    console.log("Connected MongoDB error..........");
    process.exit(1);
})
process.on('SIGINT', async () => {
    console.log("You are performing a server shutdown!")
    await mongoose.connection.close();
    process.exit(0);
})
module.exports = connectDB;