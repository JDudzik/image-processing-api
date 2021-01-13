import Ajv, { ErrorObject } from "ajv";

interface AnyObject {[key: string]: any}


const validate = (data: AnyObject, validationObject: AnyObject): ErrorObject[] | undefined | null => {
  const ajv = new Ajv();
  const validate = ajv.compile(validationObject);

  if (validate(data)) {
    return;
  } else {
    return validate.errors;
  }
}


export default validate;
