require('express-async-errors');
require('dotenv').config();
const express = require('express');
const app = express();

// database
const connectDB = require('./db/connect');

//Route
const productRouter = require('./routes/productRoutes')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.get('/', (req, res) => {
  res.send('<h1>File Upload Starter</h1>');
});

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//
app.use('/api/v1/products', productRouter)

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB('mongodb+srv://codewithgoodluck:mamalet90@cluster0.wtnohap.mongodb.net/');
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();