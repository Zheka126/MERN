import mongoose from 'mongoose';
import express from 'express';
import config from 'config';
import authRouter from './routes/authRouter.js';
import linkRouter from './routes/linkRouter.js';
import redirectRouter from './routes/redirectRouter.js';
import { path } from 'path';

const app = express();

app.use(express.json({ extended: true }));
app.use('/api/auth', authRouter);
app.use('/api/link', linkRouter);
app.use('/t/', redirectRouter);

if(process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'app', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'app', 'build', 'index.html'))
  })
}

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
