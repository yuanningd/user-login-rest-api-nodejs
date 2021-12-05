import { Request, Response, NextFunction } from 'express';
import Joi, { Schema } from 'joi';

const validateParams = (paraSchema: Schema) => (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params } = req;
    Joi.attempt(params, paraSchema);
    next();
  } catch (error: unknown) {
    res.status(400).send(error);
  }
}

export default validateParams;