const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://loan:21112003loanhoang@cluster0.1sdjxcz.mongodb.net/shoper?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected...');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Dừng server nếu lỗi
  }
};

module.exports = connectDB;
