import { LinRouter, NotFound, disableLoading } from "lin-mizar";
import ExcelJS from "exceljs";
import { groupRequired } from "../../middleware/jwt";
import {
  OrderSearchValidator,
  CreateOrUpdateOrderValidator,
} from "../../validator/order";
import { PositiveIdValidator } from "../../validator/common";

import { getSafeParamId, getClientIp } from "../../lib/util";
import { OrderNotFound } from "../../lib/exception";
import { OrderDao } from "../../dao/order";

// app 的红图实例
const orderApi = new LinRouter({
  prefix: "/v1/order",
  module: "Order",
});

// app 的dao 数据库访问层实例
const orderDto = new OrderDao();

orderApi.get("/:id", async (ctx) => {
  const v = await new PositiveIdValidator().validate(ctx);
  const id = v.get("path.id");
  const item = await orderDto.getOrder(id);
  if (!item) {
    throw new NotFound({
      code: 10022,
    });
  }
  ctx.json(item);
});

orderApi.get("/", async (ctx) => {
  const v = await new OrderSearchValidator().validate(ctx);
  const items = await orderDto.getOrders(v);
  ctx.json(items);
});

orderApi.get("/statistics/data", async (ctx) => {
  const v = await new OrderSearchValidator().validate(ctx);
  const items = await orderDto.getStatisticss(v);
  ctx.json(items);
});

orderApi.get("/search/one", async (ctx) => {
  const v = await new OrderSearchValidator().validate(ctx);
  const item = await orderDto.getOrderByKeyword(v.get("query.q"));
  if (!item) {
    throw new OrderNotFound();
  }
  ctx.json(item);
});

orderApi.get("/export/file", async (ctx) => {
  const v = await new OrderSearchValidator().validate(ctx);
  const items = await orderDto.exportOrders(v);
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Sheet1");
  // 添加表头
  sheet.columns = [
    { header: "订单号", key: "id", width: 10 },
    { header: "业务员", key: "courier", width: 10 },
    { header: "国家", key: "country", width: 30 },
    { header: "FB账号", key: "fb_name", width: 30 },
    { header: "收货人姓名", key: "user_name", width: 20 },
    { header: "收货人电话", key: "user_phone", width: 20 },
    { header: "收货人地址", key: "user_address", width: 40 },
    { header: "收货省份", key: "user_province", width: 20 },
    { header: "收货城市", key: "user_city", width: 20 },
    { header: "商品", key: "app" },
    { header: "规格", key: "sku" },
    { header: "价格", key: "price" },
    { header: "数量", key: "quantity" },
    { header: "状态", key: "status" },
    { header: "备注", key: "summary" },
    { header: "订单留言", key: "order_summary" },
  ];

  items.map((item) => {
    sheet.addRow({
      id: item.id,
      courier: item.courier,
      country: item.country,
      fb_name: item.fb_name,
      user_name: item.user_name,
      user_phone: item.user_phone,
      user_address: item.user_address,
      user_province: item.user_province,
      user_city: item.user_city,
      app: item.app.name,
      sku: item.sku,
      price: item.price,
      quantity: item.quantity,
      status: item.status,
      summary: item.summary,
      order_summary: item.order_summary,
    });
  });

  // 生成Excel文件数据
  const buffer = await workbook.xlsx.writeBuffer();
  // 设置响应类型为Excel文件
  ctx.set("Content-Disposition", "attachment;filename=mydata.xlsx");
  ctx.set(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  // 将Excel文件数据作为响应体发送
  ctx.body = buffer;
});

orderApi.linPost(
  "createOrder",
  "/",
  orderApi.permission("创建订单"),
  groupRequired,
  async (ctx) => {
    const v = await new CreateOrUpdateOrderValidator().validate(ctx);
    const user = ctx.currentUser;
    await orderDto.createOrder(v, user);
    ctx.success({
      code: 1,
    });
  }
);

orderApi.linPut(
  "putOrder",
  "/:id",
  orderApi.permission("修改订单"),
  groupRequired,
  async (ctx) => {
    const user = ctx.currentUser;
    console.log("user: ", user);

    const v = await new CreateOrUpdateOrderValidator().validate(ctx);
    const id = getSafeParamId(ctx);
    await orderDto.updateOrder(v, id);
    ctx.success({
      code: 2,
    });
  }
);

orderApi.linDelete(
  "deleteOrder",
  "/:id",
  orderApi.permission("删除订单"),
  groupRequired,
  async (ctx) => {
    const v = await new PositiveIdValidator().validate(ctx);
    const id = v.get("path.id");
    await orderDto.deleteOrder(id);
    ctx.success({
      code: 3,
    });
  }
);

module.exports = { orderApi, [disableLoading]: false };
