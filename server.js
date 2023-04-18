const express = require('express')
const app = express()
const port = 3000
const router=require('./routers/books.js')
app.use(express.json())
app.use("/",router)

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://singh10hemant99:Hemant10@cluster0.9godfo6.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', (error) => {
  console.error('Database connection error:', error);
});

mongoose.connection.once('open', () => {
  console.log('Database connected');
});

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})