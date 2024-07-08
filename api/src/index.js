

import express from "express";
import cors from "cors";
import db from "./models/index.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import localStrategy from "passport-local";
import bcrypt from "bcryptjs";
import { authenticateToken, authorizeAdmin } from "./middleware/authMiddleware.js";
import adminRoutes from "./routes/admin.js";
import homeRoutes from "./routes/properties.js";
import authRoutes from "./routes/auth.js";
import path from "path";
import addAdmin from "./utils/addAdmin.js";

const app = express();
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new localStrategy(async (username, password, done) => {
    try {
      const user = await db.Admin.findOne({ where: { username } });
      if (!user) return done(null, false);
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return done(null, false);
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.Admin.findByPk(id);
    if (!user) return done(null, false);
    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

const __dirname = path.resolve();

app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Сделайте это выше маршрутов с авторизацией
app.use("/api", authRoutes);
app.use("/api/admin", authenticateToken, authorizeAdmin, adminRoutes);
app.use("/api", homeRoutes);

const port = process.env.PORT || 4600;
app.listen(port , async () => {
  try {
    await db.sequelize.sync();
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.log(error);
  }
});
