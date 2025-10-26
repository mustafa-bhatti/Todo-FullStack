import express, { Router } from 'express';
import ConnectDB from './config/connection.js';
import morgan from 'morgan';
import dotenv from 'dotenv';
import todoRouter from './routes/todo.routes.js';
dotenv.config();
ConnectDB();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Express App Started');
});

app.use('/api/v1/', todoRouter);

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log('Express Server Started');
});
