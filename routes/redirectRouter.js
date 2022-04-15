import { Router } from 'express';
import Link from '../models/Link.js';

const redirectRouter = Router();

redirectRouter.get('/:code', async (req, res) => {
  try {
    const link = await Link.findOne({ code: req.params.code });
    if (link) {
      link.click++;
      await link.save();
      return res.redirect(link.from);
    }
    return res.status(404).send({ message: 'The link was not found' });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: error });
  }
});

export default redirectRouter;
