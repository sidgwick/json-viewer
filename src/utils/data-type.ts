import BigNumber from "bignumber.js";

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

export function valueType(value: any) {
    let type;

    if (BigNumber.isBigNumber(value)) {
        return DataType.BIGNUMBER;
    }

    // Establish value type
    if (typeof value === "string") type = DataType.STRING;
    else if (typeof value === "number") type = DataType.NUMBER;
    else if (value === false || value === true) type = DataType.BOOL;
    else if (value === null) type = DataType.NULL;
    else if (value instanceof Array) type = DataType.ARRAY;
    else type = DataType.OBJECT;

    return type;
}

