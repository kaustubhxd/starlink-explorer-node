import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()
const SECRET_KEY = process.env.SECRET_KEY

export const checkAuthentication = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ').at(-1);
  
    if (token == null) {
      return res.sendStatus(401); // Unauthorized
    }
  
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }
  
      // Store the authenticated user object in the request for further processing
      req.user = user;
      next();
    });
};