import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const protect = (req, res, next) => {
  const token = req.cookies?.token; // 👈 Get token from cookie

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied (cookie missing)' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { id: decoded.id }; // 👈 Attach user ID to request
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token in cookie' });
  }
};

export default protect;
