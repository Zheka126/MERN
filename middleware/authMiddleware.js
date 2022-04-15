import config from 'config';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).send({ message: 'Invalid authorization' });
    }

    const decoded = jwt.verify(token, config.get('jwtSecretKey'));
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).send({ message: 'Invalid authorization' });
  }
};
