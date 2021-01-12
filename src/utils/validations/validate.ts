import express from 'express';
import Ajv from "ajv";

interface AnyObject {[key: string]: any}


const requestValidator = (data: AnyObject, validationObject: AnyObject, res?: express.Response) => {
  const ajv = new Ajv();
  const validate = ajv.compile(validationObject);

  if (validate(data)) {
    return;
  } else {
    const errorObject = {
      status: 'INVALID_PROPERTIES',
      message: validate.errors,
    };

    if (res) {
      res.status(400);
      res.send(errorObject);
    } else {
      return errorObject;
    }
  }
}


export default requestValidator;
