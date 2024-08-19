"use strict";

/**
 * @description https://www.npmjs.com/package/querystringify
 */

const has = Object.prototype.hasOwnProperty;

export const querystringify = (obj, prefix) => {
  prefix = prefix || "";

  let pairs = [],
    value,
    key;

  if ("string" !== typeof prefix) prefix = "?";

  for (key in obj) {
    if (has.call(obj, key)) {
      value = obj[key];

      if (!value && (value === null || value === undefined || isNaN(value))) {
        value = "";
      }

      if (key === null || value === null) continue;
      pairs.push(key + "=" + value);
    }
  }

  return pairs.length ? prefix + pairs.join("&") : "";
};
