import express, { Router } from 'express';
import ConnectDB from './config/connection.js';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();
ConnectDB();

const PORT = process.env.PORT;

const app = express();

app.get('/', (req, res) => {
  res.send('Express App Started');
});


app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log('Express Server Started');
});