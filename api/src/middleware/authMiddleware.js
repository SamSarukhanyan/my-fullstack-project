// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    // Получаем токен из заголовка Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.sendStatus(401);
    }
    // Проверяем токен
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};

export const authorizeAdmin = (req, res, next) => {
    // Проверяем, является ли пользователь администратором
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).send('Доступ запрещен');
    }
};
