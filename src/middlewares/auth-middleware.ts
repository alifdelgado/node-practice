import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

const checkAuth = (req: Request,res: Response, next: NextFunction) => {
    try {
        const { token } = req.headers;
        if(!token) {
            throw new Error('missing header token');
        }
        jwt.verify(token as string, process.env.JWT_SECRET!);
        next();
    } catch(e) {
        res.status(401).send(e);
    }
};

const checkIp = (req: Request,res: Response, next: NextFunction) => {
    req.headers[''];
};

export { checkAuth, checkIp };