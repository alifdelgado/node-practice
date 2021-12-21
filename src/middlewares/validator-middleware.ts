import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const handleProductErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        next();
        return;
    }
    res.status(404).send(errors.array());
}