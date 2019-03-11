// 物品
export default (sequelize, DataTypes) => {
    const Goods = sequelize.define('Goods', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        img: {
            notEmpty: true,
            type: DataTypes.STRING,
            comment: "物品图片",
        },
        game_id: {
            notEmpty: true,
            type: DataTypes.INTEGER,
            comment: "游戏ID",
        },
        goods_model_id: {
            notEmpty: true,
            type: DataTypes.INTEGER,
            comment: "物品型号ID",
        },
        goods_qualities_id: {
            notEmpty: true,
            type: DataTypes.INTEGER,
            comment: "物品品质ID",
        },
        name: {
            notEmpty: true,
            type: DataTypes.STRING,
            comment: "名称",
        },
        skin_name: {
            notEmpty: true,
            type: DataTypes.STRING,
            comment: "皮肤名称",
        },
        discrable: {
            notEmpty: true,
            type: DataTypes.STRING,
            comment: "描述",
        },
        min_cost_price: {
            notEmpty: true,
            type: DataTypes.INTEGER,
            comment: "幸运抽奖最小消耗",
        },
        max_cost_price: {
            notEmpty: true,
            type: DataTypes.INTEGER,
            comment: "幸运抽奖最大消耗",
        },
        exchange_price: {
            notEmpty: true,
            type: DataTypes.INTEGER,
            comment: "兑换价格",
        },
        sell_price: {
            notEmpty: true,
            type: DataTypes.INTEGER,
            comment: "物品买出价格",
        },
        decompose_dollar_py: {
            notEmpty: true,
            type: DataTypes.FLOAT,
            comment: "分解美元比率",
        },
        decompose_exchange_py: {
            notEmpty: true,
            type: DataTypes.FLOAT,
            comment: "分解兑换币比率",
        },
        show: {
            type: DataTypes.BOOLEAN,
            validate: {
                notEmpty: true,
                defaultValue: true
            },
            comment: "是否显示",
        }
    }, {
        underscored: true,
        tableName: 'goods',
        charset: 'utf8mb4',
        indexes: [{ unique: true, fields: ['id'] }],
        classMethods: {},
        instanceMethods: {}
    })
    Goods.associate = function(models) {
        // associations can be defined here
        Goods.belongsToMany(models.Box, {
            through: {
                model: models.BoxGoods
            },
            foreignKey: 'goods_id'
        })
        Goods.hasMany(models.DecomposeGoods, { foreignKey: 'goods_id', targetKey: 'id' })
        Goods.hasMany(models.ExchangeGoods, { foreignKey: 'goods_id', targetKey: 'id' })
        Goods.hasMany(models.GiveGoods, { foreignKey: 'goods_id', targetKey: 'id' })
        Goods.hasMany(models.UserGoods, { foreignKey: 'goods_id', targetKey: 'id' })
    }
    return Goods
}