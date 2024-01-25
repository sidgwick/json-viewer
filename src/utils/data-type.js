// Constants
export const DataType = {
  STRING: 0,
  NUMBER: 1,
  OBJECT: 2,
  ARRAY: 3,
  BOOL: 4,
  NULL: 5,
  BIGNUMBER: 6,
};

export function valueType(value) {
  let type;

  // Establish value type
  if (typeof value === "string") type = DataType.STRING;
  else if (typeof value === "number") type = DataType.NUMBER;
  else if (value === false || value === true) type = DataType.BOOL;
  else if (value === null) type = DataType.NULL;
  else if (value instanceof Array) type = DataType.ARRAY;
  else if (value?.constructor?.name === "BigNumber") type = DataType.BIGNUMBER;
  else type = DataType.OBJECT;

  return type;
}

export function isString(value) {
  return DataType.STRING === valueType(value);
}

export function isNumber(value) {
  return DataType.NUMBER === valueType(value);
}

export function isBigNumber(value) {
  return DataType.BIGNUMBER === valueType(value);
}

export function isBool(value) {
  return DataType.BOOL === valueType(value);
}

export function isNull(value) {
  return DataType.NULL === valueType(value);
}

export function isObject(value) {
  return DataType.OBJECT === valueType(value);
}

export function isArray(value) {
  return DataType.ARRAY === valueType(value);
}
