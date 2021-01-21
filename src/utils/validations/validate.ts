import Ajv, { ErrorObject } from 'ajv';

interface AnyObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const validate = (
  data: AnyObject,
  validationObject: AnyObject,
): ErrorObject[] | undefined | null => {
  const ajv = new Ajv();
  const validate = ajv.compile(validationObject);

  if (validate(data)) {
    return;
  }
  return validate.errors;
};

export default validate;
