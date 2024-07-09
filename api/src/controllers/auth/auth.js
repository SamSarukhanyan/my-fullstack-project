// controllers/auth.js
import jwt from 'jsonwebtoken';
import passport from "passport";

export const adminAuth = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
      if (err || !user) {
          return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      const token = jwt.sign({ isAdmin: true }, process.env.JWT_SECRET);
      req.user = user; 
      res.status(200).json({ isAdmin: true, token });
  })(req, res, next);
};

