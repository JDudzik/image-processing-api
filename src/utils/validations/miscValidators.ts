interface AnyObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface FailedValidation {
  status: string;
  message: string;
}

interface ValidateKeysOptions {
  requiredKeys?: string[];
  optionalKeys?: string[];
  atLeastOneOptional?: boolean;
}

export const removeKeys = (payload: AnyObject, keys: string[]): AnyObject => {
  const objKeys = Object.keys(payload);
  const filteredKeys = objKeys.filter((key) => !keys.some((prop) => key === prop));

  const filteredObject: AnyObject = {};
  filteredKeys.forEach((key) => (filteredObject[key] = payload[key]));
  return filteredObject;
};

export const stringMatches = (
  string: string,
  matches: string[] = [],
): FailedValidation | boolean => {
  if (typeof string !== 'string') {
    return {
      status: 'VALUE_IS_NOT_A_STRING',
      message: `The provided value is not a string. It is a typeof: ${typeof string}`,
    };
  }

  const doesMatch = matches.includes(string);

  if (!doesMatch) {
    return {
      status: 'STRING_DOES_NOT_MATCH',
      message: `The provided string of: ${string} does not match an available option of: ${matches}`,
    };
  }

  // If there are no errors, return false so the upper-level can validate everything is OK
  return false;
};

export const validateKeys = (
  payload: AnyObject = {},
  options: ValidateKeysOptions = {},
): FailedValidation | boolean => {
  const { requiredKeys = [], optionalKeys = [], atLeastOneOptional = false } = options;

  const payloadKeys = Object.keys(payload).filter((key) => !!payload[key]);
  const availableKeys = [...optionalKeys, ...requiredKeys];
  const allPermitted = payloadKeys.every((key) => availableKeys.includes(key));

  if (!allPermitted) {
    return {
      status: 'UNPERMITTED_PROPERTY',
      message: `Invalid property found in payload. Only these are allowed: ${availableKeys}. Found these: ${payloadKeys}`,
    };
  }

  const allRequiredExist = requiredKeys.every((requiredKey) => payloadKeys.includes(requiredKey));
  if (!allRequiredExist) {
    return {
      status: 'MISSING_REQUIRED_PROPERTY',
      message: `Payload is missing a required property. These are required: ${requiredKeys}`,
    };
  }

  if (atLeastOneOptional && optionalKeys.length === 0) {
    return {
      status: 'REQUIRES_ONE_OPTIONAL_PROPERTY',
      message: 'Payload requires at least one property to be declared',
    };
  }

  // If there are no errors, return false so the upper-level can validate everything is OK
  return false;
};

export const isNumber = (string: string): boolean => {
  if (typeof string !== 'string') {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return !isNaN(string as any) && !isNaN(parseFloat(string));
};
