// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';

// dotenv.config();

// const JWT_SECRET = process.env.JWT_SECRET;

// const protect = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'No token, authorization denied' });
//   }

//   const token = authHeader.split(' ')[1];

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = decoded; // You can also do: req.userId = decoded.id;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: 'Token is not valid' });
//   }
// };

// export default protect;


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
