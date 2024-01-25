import JSONbig from "json-bigint";
import BigNumber from "bignumber.js";

export function expandInnerJsonString(val) {
  if (!val) {
    return val;
  }

  if (val instanceof BigNumber) {
    return val;
  } else if (typeof val === "string") {
    // 字符串类型尝试反序列化, 如果可以反序列化处理之, 不可以则保持原状.
    try {
      val = JSONbig.parse(val);
    } catch (e) {
      console.debug("[ignore] parse json failed", val, e);
    }
  } else if (Array.isArray(val)) {
    const nVal = [];
    for (let i = 0; i < val.length; i++) {
      nVal.push(expandInnerJsonString(val[i]));
    }

    val = nVal;
  } else if (typeof val === "object") {
    const nVal = {};
    for (const objKey in val) {
      nVal[objKey] = expandInnerJsonString(val[objKey]);
    }

    val = nVal;
  }

  return val;
}

export function clearNonMatchPath(obj, searchName) {
  if (searchName === "") {
    return obj;
  }

  if (!obj) {
    return null;
  }

  if (obj instanceof BigNumber) {
    return null;
  }

  if (Array.isArray(obj)) {
    const nVal = [];
    for (let i = 0; i < obj.length; i++) {
      const child = clearNonMatchPath(obj[i], searchName);
      if (child) nVal.push(child);
    }

    if (nVal.length > 0) return nVal;
  } else if (
    typeof obj === "object" &&
    obj?.constructor?.name !== "BigNumber"
  ) {
    const nVal = {};
    for (const objKey in obj) {
      const val = obj[objKey];

      if (objKey.indexOf(searchName) !== -1) {
        nVal[objKey] = val;
      } else {
        const child = clearNonMatchPath(val, searchName);
        if (child) {
          nVal[objKey] = child;
        }
      }
    }

    if (Object.keys(nVal).length > 0) return nVal;
  }

  return null;
}
