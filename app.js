import mongoose from 'mongoose';
import express from 'express';
import config from 'config';
import authRouter from './routes/authRoute.js';
import './routes/authRoute.js';

const app = express();

app.use('/api/auth', authRouter);

const PORT = config.get('port') || 5000;

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'));
    app.listen(PORT, () => console.log('estkurit'));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

start();
