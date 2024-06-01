import { NotFound, Forbidden } from "lin-mizar";
import Sequelize from "sequelize";
import { set } from "lodash";
import { App } from "../model/app";

class AppDao {
  async getApp(id) {
    const item = await App.findOne({
      where: {
        id,
      },
    });
    return item;
  }

  async getAppByKeyword(q) {
    const item = await App.findOne({
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
    v.get("query.name") && set(condition, "name", v.get("query.name"));
    const { rows, count } = await App.findAndCountAll({
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
    const item = await App.findOne({
      where: {
        name: v.get("body.name"),
      },
    });
    if (item) {
      throw new Forbidden({
        code: 10240,
      });
    }
    const bk = new App();
    bk.name = v.get("body.name");
    bk.url = v.get("body.url");
    bk.config = v.get("body.config");
    bk.summary = v.get("body.summary");
    await bk.save();
  }

  async updateApp(v, id) {
    const item = await App.findByPk(id);
    if (!item) {
      throw new NotFound({
        code: 10022,
      });
    }
    item.name = v.get("body.name");
    item.config = v.get("body.config");
    item.url = v.get("body.url");
    item.summary = v.get("body.summary");
    await item.save();
  }

  async deleteApp(id) {
    const item = await App.findOne({
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

export { AppDao };
