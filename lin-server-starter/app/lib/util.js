import { toSafeInteger, get, isInteger } from "lodash";
import { ParametersException } from "lin-mizar";

function getSafeParamId(ctx) {
  const id = toSafeInteger(get(ctx.params, "id"));
  if (!isInteger(id)) {
    throw new ParametersException({
      code: 10030,
    });
  }
  return id;
}

function isOptional(val) {
  // undefined , null , ""  , "    ", 皆通过
  if (val === undefined) {
    return true;
  }
  if (val === null) {
    return true;
  }
  if (typeof val === "string") {
    return val === "" || val.trim() === "";
  }
  return false;
}

function getClientIp(ctx) {
  const headers = ctx.headers;
  const ip = ctx.ip;
  if (headers["x-real-ip"]) {
    return headers["x-real-ip"];
  }
  if (headers["x-forwarded-for"]) {
    const ipList = headers["x-forwarded-for"].split(",");
    return ipList[0];
  }
  if (ip) {
    return ip;
  }

  return "0.0.0.0";
}

export { getSafeParamId, isOptional, getClientIp };
