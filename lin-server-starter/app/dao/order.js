import { NotFound, Forbidden } from "lin-mizar";
import Sequelize from "sequelize";
import { set } from "lodash";
import { Order } from "../model/order";
import { App as AppModals } from "../model/app";

class OrderDao {
  async getOrder(id) {
    const item = await Order.findOne({
      where: {
        id,
      },
      include: [
        {
          model: AppModals,
          as: "app",
        },
      ],
    });
    return item;
  }

  async getOrderByKeyword(q) {
    const item = await Order.findOne({
      where: {
        title: {
          [Sequelize.Op.like]: `%${q}%`,
        },
      },
      include: [
        {
          model: AppModals,
          as: "app",
        },
      ],
    });
    return item;
  }

  async getOrders(v) {
    const page = v.get("query.page");
    const limit = v.get("query.limit");
    const condition = {};
    v.get("query.user_phone") &&
      set(condition, "user_phone", v.get("query.user_phone"));
    v.get("query.start") &&
      v.get("query.end") &&
      set(condition, "create_time", {
        [Sequelize.Op.between]: [v.get("query.start"), v.get("query.end")],
      });

    v.get("query.status") && set(condition, "status", v.get("query.status"));
    const { rows, count } = await Order.findAndCountAll({
      where: Object.assign({}, condition),
      include: [
        {
          model: AppModals,
          as: "app",
        },
      ],
      offset: page * limit,
      limit: limit,
      order: [["create_time", "DESC"]],
    });
    return {
      list: rows,
      total: count,
    };
  }

  async getStatisticss(v) {
    const page = v.get("query.page");
    const limit = v.get("query.limit");
    const condition = {};
    v.get("query.salesman") &&
      set(condition, "salesman", v.get("query.salesman"));
    v.get("query.start") &&
      v.get("query.end") &&
      set(condition, "create_time", {
        [Sequelize.Op.between]: [v.get("query.start"), v.get("query.end")],
      });

    const rows = await Order.findAll({
      where: Object.assign({}, condition),
      attributes: [
        "salesman",
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'total_count'],
        [Sequelize.fn("DATE", Sequelize.col("create_time")), "date"],
        [Sequelize.fn("SUM", Sequelize.col("price")), "total_price"],
        [Sequelize.fn('SUM', Sequelize.literal(`CASE WHEN status = 0 THEN 1 ELSE 0 END`)), 'status_0_count'],
        [Sequelize.fn('SUM', Sequelize.literal(`CASE WHEN status = 1 THEN 1 ELSE 0 END`)), 'status_1_count'],
        [Sequelize.fn('SUM', Sequelize.literal(`CASE WHEN status = 2 THEN 1 ELSE 0 END`)), 'status_2_count'],
        [Sequelize.fn('SUM', Sequelize.literal(`CASE WHEN status = 3 THEN 1 ELSE 0 END`)), 'status_3_count'],
        [Sequelize.fn('SUM', Sequelize.literal(`CASE WHEN status = 4 THEN 1 ELSE 0 END`)), 'status_4_count'],
        [Sequelize.fn('SUM', Sequelize.literal(`CASE WHEN status = 5 THEN 1 ELSE 0 END`)), 'status_5_count'],
        [Sequelize.fn('SUM', Sequelize.literal(`CASE WHEN status = 6 THEN 1 ELSE 0 END`)), 'status_6_count'],
      ],
      group: ["salesman", Sequelize.fn("DATE", Sequelize.col("create_time"))],
      order: [
        ['salesman', 'ASC'],
        [Sequelize.fn('DATE', Sequelize.col('date')), 'DESC']
      ],
    });
    return rows
  }

  async exportOrders(v) {
    const page = v.get("query.page");
    const limit = v.get("query.limit");
    const condition = {};
    v.get("query.user_phone") &&
      set(condition, "user_phone", v.get("query.user_phone"));
    v.get("query.start") &&
      v.get("query.end") &&
      set(condition, "create_time", {
        [Sequelize.Op.between]: [v.get("query.start"), v.get("query.end")],
      });

    v.get("query.status") && set(condition, "status", v.get("query.status"));
    const { rows, count } = await Order.findAndCountAll({
      where: Object.assign({}, condition),
      include: [
        {
          model: AppModals,
          as: "app",
        },
      ],
    });
    return rows;
  }

  async createOrder(v, user) {
    console.log("user: ", user);
    const book = await Order.findOne({
      where: {
        user_phone: v.get("body.user_phone"),
      },
    });
    if (book) {
      throw new Forbidden({
        code: 10240,
        message: "手机号已经存在",
      });
    }
    const bk = new Order();
    bk.name = v.get("body.name");
    bk.courier = v.get("body.courier");
    bk.country = v.get("body.country");
    bk.fb_name = v.get("body.fb_name");
    bk.purchase_no = v.get("body.purchase_no");
    bk.salesman = user.username;
    bk.inter_express_no = v.get("body.inter_express_no");
    bk.status = v.get("body.status");
    bk.user_name = v.get("body.user_name");
    bk.user_phone = v.get("body.user_phone");
    bk.user_address = v.get("body.user_address");
    bk.user_province = v.get("body.user_province");
    bk.user_city = v.get("body.user_city");
    bk.payment = v.get("body.payment");
    bk.sku = v.get("body.sku");
    bk.quantity = v.get("body.quantity");
    bk.price = v.get("body.price");
    bk.cost = v.get("body.cost");
    bk.summary = v.get("body.summary");
    bk.order_summary = v.get("body.order_summary");
    bk.app_id = v.get("body.app_id");
    bk.create_time = v.get("body.create_time");
    await bk.save();
  }

  async updateOrder(v, id) {
    const bk = await Order.findByPk(id);
    if (!bk) {
      throw new NotFound({
        code: 10022,
      });
    }
    bk.name = v.get("body.name");
    bk.courier = v.get("body.courier");
    bk.country = v.get("body.country");
    bk.fb_name = v.get("body.fb_name");
    bk.purchase_no = v.get("body.purchase_no");
    bk.salesman = v.get("body.salesman");
    bk.inter_express_no = v.get("body.inter_express_no");
    bk.status = v.get("body.status");
    bk.user_name = v.get("body.user_name");
    bk.user_phone = v.get("body.user_phone");
    bk.user_address = v.get("body.user_address");
    bk.user_province = v.get("body.user_province");
    bk.user_city = v.get("body.user_city");
    bk.payment = v.get("body.payment");
    bk.sku = v.get("body.sku");
    bk.quantity = v.get("body.quantity");
    bk.price = v.get("body.price");
    bk.cost = v.get("body.cost");
    bk.summary = v.get("body.summary");
    bk.order_summary = v.get("body.order_summary");
    bk.app_id = v.get("body.app_id");
    bk.create_time = v.get("body.create_time");
    await bk.save();
  }

  async deleteOrder(id) {
    const item = await Order.findOne({
      where: {
        id,
      },
    });
    if (!item) {
      throw new NotFound({
        code: 10022,
      });
    }
    item.destroy();
  }
}

export { OrderDao };
