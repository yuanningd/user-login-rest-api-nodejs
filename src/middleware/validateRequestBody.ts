import { Request, Response, NextFunction } from 'express';
import Joi, { Schema } from 'joi';

const validateRequestBody = (paraSchema: Schema) => (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;
    Joi.attempt(body, paraSchema);
    next();
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}

export default validateRequestBody;