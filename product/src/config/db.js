const mongoose = require('mongoose');

const connectDB = async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/myproducts', { autoIndex: false });
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error("failed connection with DB:", error)
    }
}

module.exports = connectDB ;