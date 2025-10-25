import express, { Router } from 'express';
import ConnectDB from './config/connection.js';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();
ConnectDB();


