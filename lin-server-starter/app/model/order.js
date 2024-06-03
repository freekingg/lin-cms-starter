import { InfoCrudMixin } from "lin-mizar";
import { merge } from "lodash";
import { Sequelize, Model } from "sequelize";
import sequelize from "../lib/db";
import { App as AppModals } from './app';
class Order extends Model {
  // toJSON() {
  //   const origin = {
  //     id: this.id,
  //     name: this.name,
  //     config: this.config,
  //     app: this.app,
  //     ip: this.ip,
  //     status: this.status,
  //     tracking_no: this.tracking_no,
  //     summary: this.summary,
  //     create_time: this.create_time,
  //   };
  //   return origin;
  // }
}

Order.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    courier: {
      type: Sequelize.STRING(10),
      allowNull: true,
      comment: '快递'
    },
    country: {
      type: Sequelize.STRING(50),
      allowNull: true,
      comment: '国家'
    },
    fb_name: {
      type: Sequelize.STRING(50),
      allowNull: true,
      comment: 'FB用户名'
    },
    purchase_no: {
      type: Sequelize.STRING(50),
      allowNull: true,
      comment: '采购订单号'
    },
    salesman: {
      type: Sequelize.STRING(50),
      allowNull: true,
      comment: '业务员'
    },
    inter_express_no: {
      type: Sequelize.STRING(50),
      allowNull: true,
      comment: '国际快递单号'
    },
    status: {
      type: Sequelize.INTEGER(2),
      defaultValue: 1,
      comment: '订单状态 1：待确认 2：已确认 3：已签收 4：未签收'
    },
    user_name: {
      type: Sequelize.STRING(50),
      allowNull: true,
      comment: '用户姓名'
    },
    user_phone: {
      type: Sequelize.STRING(50),
      allowNull: true,
      comment: '用户手机'
    },
    user_address: {
      type: Sequelize.STRING(200),
      allowNull: true,
      comment: '用户收货地址'
    },
    user_province: {
      type: Sequelize.STRING(200),
      allowNull: true,
      comment: '省份'
    },
    user_city: {
      type: Sequelize.STRING(200),
      allowNull: true,
      comment: '城市'
    },
    payment: {
      type: Sequelize.INTEGER(2),
      defaultValue: 1,
      comment: '支付方式 1：货到付款 2：在线支付'
    },
    sku: {
      type: Sequelize.STRING(100),
      allowNull: true,
      comment: '规格'
    },
    quantity: {
      type: Sequelize.INTEGER(2),
      defaultValue: 1,
      comment: '数量'
    },
    price: {
      type: Sequelize.STRING(20),
      allowNull: true,
      comment: '价格'
    },
    cost: {
      type: Sequelize.STRING(20),
      allowNull: true,
      comment: '成本'
    },
    summary: {
      type: Sequelize.STRING(1000),
      allowNull: true,
      comment: '备注'
    },
    order_summary: {
      type: Sequelize.STRING(1000),
      allowNull: true,
      comment: '订单留言'
    },
    // 配置信息
    config: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    app_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    tracking_no: {
      type: Sequelize.STRING(20),
      allowNull: true,
    },
  },
  merge(
    {
      sequelize,
      tableName: "order",
      modelName: "order",
      indexes: [
        {
          name: 'phone_del',
          unique: true,
          fields: ['user_phone', 'delete_time']
        }
      ]
    },
    InfoCrudMixin.options
  )
);
Order.belongsTo(AppModals, { foreignKey: 'app_id', targetKey: 'id' });

export { Order };
