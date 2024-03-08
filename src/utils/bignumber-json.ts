import { stringify, parse } from "lossless-json";
import BigNumber from "bignumber.js";

const parseDecimal = (value: string) => new BigNumber(value)

const decimalStringifier = {
    test: (value: any) => BigNumber.isBigNumber(value),
    stringify: (value: any) => value.toString()
}


export default class JSONBigFix {
    static parse(text: string): any {
        return parse(text, undefined, parseDecimal)
    }

    static stringify(value: any): string {
        return stringify(value, undefined, undefined, [decimalStringifier]) ?? ""
    }
}


