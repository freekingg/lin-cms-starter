import { LinRouter, NotFound, disableLoading } from "lin-mizar";
import { groupRequired } from "../../middleware/jwt";
import {
  AppSearchValidator,
  CreateOrUpdateAppValidator,
} from "../../validator/app";
import { PositiveIdValidator } from "../../validator/common";

import { getSafeParamId } from "../../lib/util";
import { AppNotFound } from "../../lib/exception";
import { AppDao } from "../../dao/app";

// app 的红图实例
const appkApi = new LinRouter({
  prefix: "/v1/app",
  module: "App",
});

// app 的dao 数据库访问层实例
const appDto = new AppDao();

appkApi.get("/:id", async (ctx) => {
  const v = await new PositiveIdValidator().validate(ctx);
  const id = v.get("path.id");
  const item = await appDto.getApp(id);
  if (!item) {
    throw new NotFound({
      code: 10022,
    });
  }
  ctx.json(item);
});

appkApi.get("/", async (ctx) => {
  const v = await new AppSearchValidator().validate(ctx);
  const items = await appDto.getApps(v);
  ctx.json(items);
});

appkApi.get("/search/one", async (ctx) => {
  const v = await new AppSearchValidator().validate(ctx);
  const item = await appDto.getAppByKeyword(v.get("query.q"));
  if (!item) {
    throw new AppNotFound();
  }
  ctx.json(item);
});

appkApi.post("/", async (ctx) => {
  const v = await new CreateOrUpdateAppValidator().validate(ctx);
  await appDto.createApp(v);
  ctx.success({
    code: 1,
  });
});

// appkApi.put('/:id', async ctx => {
//   const v = await new CreateOrUpdateAppValidator().validate(ctx);
//   const id = getSafeParamId(ctx);
//   await appDto.updateApp(v, id);
//   ctx.success({
//     code: 2
//   });
// });

appkApi.linPut(
  "putApp",
  "/:id",
  appkApi.permission("修改App"),
  groupRequired,
  async (ctx) => {
    const v = await new CreateOrUpdateAppValidator().validate(ctx);
    const id = getSafeParamId(ctx);
    await appDto.updateApp(v, id);
    ctx.success({
      code: 2,
    });
  }
);

appkApi.linDelete(
  "deleteApp",
  "/:id",
  appkApi.permission("删除App"),
  groupRequired,
  async (ctx) => {
    const v = await new PositiveIdValidator().validate(ctx);
    const id = v.get("path.id");
    await appDto.deleteApp(id);
    ctx.success({
      code: 3,
    });
  }
);

module.exports = { appkApi, [disableLoading]: false };
