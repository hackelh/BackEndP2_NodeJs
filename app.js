const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes')
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS" );
    next();
  });
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

try {
    mongoose.connect('mongodb+srv://sallelhadj61:t9NAF99jvK07YOZq@cluster0.ipvao.mongodb.net/', {});
    console.log("Connected to MongoDB");
} catch (error) {
    console.error("Error connecting to MongoDB:", error);
}

app.use('/api/auth', userRoutes);
app.use('/api/books', bookRoutes);

app.listen(4000, () => {
    console.log(`Server is running on port 4000`);
});



