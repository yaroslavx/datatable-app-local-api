import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import {
  create,
  deleteItem,
  getAllItems,
  getSingleItem,
  updateItem,
} from './controllers/ItemController.js';

// Подключение env переменных
dotenv.config();

// Подсоединение MongoDB
const connect = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://admin:zpqBOupgDTbj0Jeq@cluster0.4huy1th.mongodb.net/?retryWrites=true&w=majority'
    );
    console.log('Connected to mongoDB.');
  } catch (error) {
    throw error;
  }
};

const app = express();
app.use(express.json());
app.use(cors());

// запросы для работы с данными
app.get('/', getAllItems);
app.get('/:id', getSingleItem);
app.post('/item', create);
app.delete('/item', deleteItem);
app.put('/item', updateItem);

// Middleware для обработки ошибок
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong';
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(5000, (err) => {
  connect();

  console.log('Server started');
});
