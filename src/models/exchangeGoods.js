// 分解物品
export default (sequelize, DataTypes) => {
    const ExchangeGoods = sequelize.define('ExchangeGoods', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        uid: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: true,
            },
            comment: "用户ID",
        },
        game_id: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: true,
            },
            comment: "游戏ID",
        },
        orderid: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
            },
            comment: "兑换订单ID",
        },
        game_account: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
            },
            comment: "游戏帐号",
        },
        game_zone_info: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
            },
            comment: "游戏分区信息",
        },
        goods_id: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: true,
            },
            comment: "物品ID",
        },
        goods_num: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: true,
            },
            comment: "物品数量",
        },
        state: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: true,
            },
            comment: "审核状态 [0 - 末审核, 1 - 审核成功, 2 - 审核失败]"
        }

    }, {
        underscored: true,
        tableName: 'exchange_goods_records',
        charset: 'utf8mb4',
        indexes: [{ unique: true, fields: ['id'] }],
        classMethods: {},
        instanceMethods: {}
    })

    // 添加一个类级别的方法
    ExchangeGoods.associate = function(models) {
        models.ExchangeGoods.belongsTo(models.Goods, { foreignKey: 'goods_id' })
    }
    return ExchangeGoods
}