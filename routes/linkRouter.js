import { Router } from 'express';
import shortid from 'shortid';
import config from 'config';
import Link from '../models/Link.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const linkRouter = Router();

linkRouter.post('/generate', authMiddleware, async (req, res) => {
  try {
    const baseUrl = config.get('baseUrl');
    const { from } = req.body;
    const existingLink = await Link.findOne({ from });
    const code = shortid.generate();
    const to = baseUrl + '/t/' + code;

    if (await Link.findOne({ from })) {
      return res.send({ link: existingLink });
    }

    const newLink = new Link({
      from,
      to,
      code,
      owner: req.user.userId,
    });
    await newLink.save();
    return res.status(201).send({ link: newLink });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: error });
  }
});

linkRouter.get('/', authMiddleware, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    return res.send(links);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: error });
  }
});

linkRouter.get('/:id', authMiddleware, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    return res.send(link);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: error });
  }
});

export default linkRouter;
