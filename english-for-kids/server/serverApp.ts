/* eslint-disable no-console */
import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const PORT_8080 = 8080;
const ERROR_403 = 403;

export const serverApp = express();
serverApp.use(express.urlencoded({ extended: false }));
serverApp.use(express.json());
serverApp.use(cors());

const publicPath = path.resolve(__dirname, '../dist');
const indexPath = path.resolve(__dirname, '../dist/index.html');

serverApp.use(/^(?!\/api\/)/, express.static(publicPath));
serverApp.use(/^(?!\/api\/)/, (req, res) => {
  res.sendFile(indexPath);
});

// req: any -- так как не работает req.token с типом Request, другие варианты не сработали
function verifyToken(req: any, res: Response, next: NextFunction): void {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(ERROR_403);
  }
}

serverApp.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the API',
  });
});

// req: any -- так как не работает req.token с типом Request, другие варианты не сработали
serverApp.post('/api/posts', verifyToken, (req: any, res: Response) => {
  jwt.verify(req.token, 'secretkey', (err: unknown, authData: unknown) => {
    if (err) {
      res.sendStatus(ERROR_403);
    } else {
      res.json({
        message: 'Post created...',
        authData,
      });
    }
  });
});

serverApp.post('/api/login', (req: Request, res: Response) => {
  const user = {
    login: 'admin',
    password: 'admin',
  };

  jwt.sign({ user }, 'secretkey', (err: unknown, token: unknown) => {
    res.json({
      token,
    });
  });
});

serverApp.listen(PORT_8080, () => console.log('Server started on http://localhost:8080'));
