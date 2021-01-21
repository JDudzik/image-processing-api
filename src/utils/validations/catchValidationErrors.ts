import express from 'express';
import { ValidationError } from 'express-json-validator-middleware';

const catchValidationErrors = (
  err: express.ErrorRequestHandler,
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): void => {
  if (err instanceof ValidationError) {
    res.status(400);
    res.send({
      status: 'INVALID_PROPERTIES',
      message: err && err.validationErrors,
    });
    next();
  } else {
    next(err);
  }
};

export default catchValidationErrors;
