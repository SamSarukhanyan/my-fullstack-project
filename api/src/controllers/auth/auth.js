// controllers/auth.js
import jwt from 'jsonwebtoken';
import passport from "passport";

// Стратегия аутентификации для администраторов
export const adminAuth = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
      if (err || !user) {
          return res.status(401).json({ message: 'Invalid credentials' });
      }
      // If authentication succeeds, generate token and send it along with isAdmin status
      const token = jwt.sign({ isAdmin: true }, process.env.JWT_SECRET);
      req.user = user; // Устанавливаем информацию о пользователе в объект req
      res.status(200).json({ isAdmin: true, token });
  })(req, res, next);
};

