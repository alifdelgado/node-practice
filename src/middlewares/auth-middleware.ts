/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

declare global {
    namespace Express {
        export interface Request {
            session: {
                userId: string;
                email: string;
            };
        }
    }
}

const checkAuth = (req: Request,res: Response, next: NextFunction) => {
    try {
        const { token } = req.headers;
        if(!token) {
            throw new Error('missing header token');
        }
        const { userId, email } = jwt.verify(token as string, process.env.JWT_SECRET!) as any;
        req.session = {
            userId,
            email,
        };
        next();
    } catch(e) {
        res.status(401).send(e);
    }
};

const checkIp = (req: Request,res: Response, next: NextFunction) => {
    req.headers[''];
};

export { checkAuth, checkIp };