import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import express from 'express'

dotenv.config()
const SECRET_KEY = process.env.SECRET_KEY

const router = express.Router()

router.post('/login', (req, res) => {
    // Simulate user authentication
    const username = req.body.username;
    const password = req.body.password;
  
    if (username === 'stargazer' && password === '1234') {
      // Generate a JWT token and send it back to the client
      const token = jwt.sign({ username: username }, SECRET_KEY);
      res.json({ token: token });
    } else {
      res.sendStatus(401); // Unauthorized
    }
});
  
export default router
