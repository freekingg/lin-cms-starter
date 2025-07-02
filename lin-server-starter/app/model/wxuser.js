import { InfoCrudMixin } from "lin-mizar";
import { merge } from "lodash";
import { Sequelize, Model } from "sequelize";
import sequelize from "../lib/db";

class WxUser extends Model {
  toJSON() {
    const origin = {
      id: this.id,
      username: this.username,
      friendname: this.friendname,
      type: this.type,
      config: this.config,
      summary: this.summary,
      create_time: this.create_time,
    };
    return origin;
  }
}

WxUser.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    friendname: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    type: {
      type: Sequelize.INTEGER(2),
      defaultValue: 1,
      comment: ' 1：个人 2：组 3：其它'
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
      tableName: "wxuser",
      modelName: "wxuser",
    },
    InfoCrudMixin.options
  )
);

export { WxUser };
