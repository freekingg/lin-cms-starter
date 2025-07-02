import { NotFound, Forbidden } from "lin-mizar";
import Sequelize from "sequelize";
import { set } from "lodash";
import { WxUser } from "../model/wxuser";

class WxUserDao {
  async getApp(id) {
    const item = await WxUser.findOne({
      where: {
        id,
      },
    });
    return item;
  }

  async getAppByKeyword(q) {
    const item = await WxUser.findOne({
      where: {
        title: {
          [Sequelize.Op.like]: `%${q}%`,
        },
      },
    });
    return item;
  }

  async getApps(v) {
    const page = v.get("query.page");
    const limit = v.get("query.limit");
    const condition = {};
    v.get("query.username") && set(condition, "username", v.get("query.username"));
    const { rows, count } = await WxUser.findAndCountAll({
      where: Object.assign({}, condition),
      offset: page * limit,
      limit: limit,
      order: [["create_time", "ASC"]],
    });
    return {
      list: rows,
      total: count,
    };
  }

  async createApp(v) {
    const item = await WxUser.findOne({
      where: {
        friendname: v.get("body.friendname"),
      },
    });
    if (item) {
      console.log('已存在，不处理');
      return
      // throw new Forbidden({
      //   code: 10240,
      // });
    }
    const bk = new WxUser();
    bk.username = v.get("body.username");
    bk.friendname = v.get("body.friendname");
    bk.config = v.get("body.config");
    bk.type = v.get("body.type");
    bk.summary = v.get("body.summary");
    await bk.save();
  }

  async updateApp(v, id) {
    const item = await WxUser.findByPk(id);
    if (!item) {
      throw new NotFound({
        code: 10022,
      });
    }
    item.username = v.get("body.username");
    item.config = v.get("body.config");
    item.type = v.get("body.type");
    item.friendname = v.get("body.friendname");
    item.summary = v.get("body.summary");
    await item.save();
  }

  async deleteApp(id) {
    const item = await WxUser.findOne({
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

export { WxUserDao };
