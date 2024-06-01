import { InfoCrudMixin } from "lin-mizar";
import { merge } from "lodash";
import { Sequelize, Model } from "sequelize";
import sequelize from "../lib/db";

class App extends Model {
  toJSON() {
    const origin = {
      id: this.id,
      name: this.name,
      url: this.url,
      config: this.config,
      summary: this.summary,
      create_time: this.create_time,
    };
    return origin;
  }
}

App.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    url: {
      type: Sequelize.STRING(200),
      allowNull: true,
    },
    // 配置信息
    config: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    summary: {
      type: Sequelize.STRING(1000),
      allowNull: true,
    },
  },
  merge(
    {
      sequelize,
      tableName: "app",
      modelName: "app",
    },
    InfoCrudMixin.options
  )
);

export { App };
