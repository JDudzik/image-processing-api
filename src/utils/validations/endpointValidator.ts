import express from 'express';
import { Validator } from 'express-json-validator-middleware';

const endpointValidator = (validationObject: object, validatorOptions = {allErrors: true}): express.RequestHandler => {
  const validator = new Validator(validatorOptions);
  const validate = validator.validate;

  return validate(validationObject);
}


export default endpointValidator;
