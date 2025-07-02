import { LinRouter, NotFound, disableLoading } from "lin-mizar";
import { groupRequired } from "../../middleware/jwt";
import {
  AppSearchValidator,
  CreateOrUpdateAppValidator,
} from "../../validator/wxuser";
import { PositiveIdValidator } from "../../validator/common";
import axios from "axios";
import { getSafeParamId } from "../../lib/util";
import { AppNotFound } from "../../lib/exception";
import { WxUserDao } from "../../dao/wxuser";

// app 的红图实例
const wxUserApi = new LinRouter({
  prefix: "/v1/wxuser",
  module: "WxUser",
});

// app 的dao 数据库访问层实例
const wxUserDto = new WxUserDao();

wxUserApi.get("/:id", async (ctx) => {
  const v = await new PositiveIdValidator().validate(ctx);
  const id = v.get("path.id");
  const item = await wxUserDto.getApp(id);
  if (!item) {
    throw new NotFound({
      code: 10022,
    });
  }
  ctx.json(item);
});

wxUserApi.get("/", async (ctx) => {
  const v = await new AppSearchValidator().validate(ctx);
  const items = await wxUserDto.getApps(v);
  ctx.json(items);
});

wxUserApi.get("/search/one", async (ctx) => {
  const v = await new AppSearchValidator().validate(ctx);
  const item = await wxUserDto.getAppByKeyword(v.get("query.q"));
  if (!item) {
    throw new AppNotFound();
  }
  ctx.json(item);
});

wxUserApi.post("/", async (ctx) => {
  const v = await new CreateOrUpdateAppValidator().validate(ctx);
  try {
    await wxUserDto.createApp(v);
  } catch (error) {
    console.log("error: ", error);
  }
  ctx.success({
    code: 1,
  });
});

// wxUserApi.put('/:id', async ctx => {
//   const v = await new CreateOrUpdateAppValidator().validate(ctx);
//   const id = getSafeParamId(ctx);
//   await wxUserDto.updateApp(v, id);
//   ctx.success({
//     code: 2
//   });
// });

wxUserApi.linPut(
  "putApp",
  "/:id",
  wxUserApi.permission("修改App"),
  groupRequired,
  async (ctx) => {
    const v = await new CreateOrUpdateAppValidator().validate(ctx);
    const id = getSafeParamId(ctx);
    await wxUserDto.updateApp(v, id);
    ctx.success({
      code: 2,
    });
  }
);

wxUserApi.linDelete(
  "deleteApp",
  "/:id",
  wxUserApi.permission("删除App"),
  groupRequired,
  async (ctx) => {
    const v = await new PositiveIdValidator().validate(ctx);
    const id = v.get("path.id");
    await wxUserDto.deleteApp(id);
    ctx.success({
      code: 3,
    });
  }
);

let aznfzToken = {};
let clientKey = "B6820A369403F1C13851727C0B73B353";
let clientSecret = "FAD4A8F0F7F94A2D9FC189440277FEC2";

const getAznfzLogin = async () => {
  if (!aznfzToken.accessToken) {
    let res = await axios({
      method: "get",
      url: "https://www.aznfz.com/api/get_token",
      params: {
        clientKey: clientKey,
        clientSecret: clientSecret,
      },
    });
    aznfzToken = { ...res.data.data };
  }
  return aznfzToken;
};

const getAznfzDeviceList = async () => {
  let result = {};
  let res = await axios({
    method: "get",
    url: "https://www.aznfz.com/api/device/list",
    params: {
      clientKey: clientKey,
      clientSecret: clientSecret,
      accessToken: aznfzToken.accessToken,
    },
  });
  console.log("res", res);
  result = { ...res.data.data };
  return result;
};




wxUserApi.get("/aznfz/device/list", async (ctx) => {
  let result = {};
  if (aznfzToken.accessToken) {
    let res = await getAznfzDeviceList()
    result = res
  } else {
    await getAznfzLogin();
    let res = await getAznfzDeviceList()
    result = res
  }

  ctx.json({ ...result });
});

module.exports = { wxUserApi, [disableLoading]: false };
